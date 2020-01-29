import { SourceProvider } from '@lit-dashboard/lit-dashboard';
import { addSourceProviderType } from '@lit-dashboard/lit-dashboard/app';
import { isNull } from 'lodash';

class MyFirstProvider extends SourceProvider {

	static get typeName() {
		return 'My First Provider';
	}

	static get settingsDefaults() {
		return {
			sourceRoot: 'root'
		};
  }

	constructor(settings) {
		super();
		this.sourceRoot = settings.sourceRoot;
	}

	updateFromProvider(updateSource) {

		this.sources = new Proxy({}, {
			get: (sources, key) => {
				return sources[key];
			},
			set: (sources, key, value) => {
				sources[key] = value;
				updateSource(key, value);
				return true;
			}
		});

		this.sources[`${this.sourceRoot}/boolean`] = true;
		this.sources[`${this.sourceRoot}/number`] = 10;
		this.sources[`${this.sourceRoot}/string`] = 'this is a string';
	}

	updateFromDashboard(key, value) {
	
		const type = this.getType(value);

		if (isNull(type)) {
			return;
		}

		if (key in this.sources) {
			if (type === this.getType(this.sources[key])) {
				this.sources[key] = value;
			}
		} else {
			this.sources[key] = value;
		}
	}
}

addSourceProviderType(MyFirstProvider);
