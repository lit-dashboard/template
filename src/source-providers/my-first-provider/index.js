import { SourceProvider } from '@lit-dashboard/lit-dashboard';
import { addSourceProviderType } from '@lit-dashboard/lit-dashboard/app';

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
		this.initSources = {};
	}

	updateFromProvider(updateSource) {
		this.sources = new Proxy(this.initSources || {}, {
			get: (sources, key) => {
				return sources[key];
			},
			set: (sources, key, { value, type, name }) => {

				sources[key] = { value, type, name };

				updateSource(key, {
					value,
					type,
					name
				});

				return true;
			}
		});

		updateSource(`${this.sourceRoot}/boolean`, {
			value: true,
			type: 'Boolean',
			name: 'Some Boolean'
		});

		updateSource(`${this.sourceRoot}/number`, {
			value: 10,
			type: 'Number',
			name: 'Some Number'
		});

		updateSource(`${this.sourceRoot}/string`, {
			value: 'this is a string',
			type: 'String',
			name: 'Some String'
		});
	}

	updateFromDashboard(key, value) {
	
		const type = this.getType(value);

		if (isNull(type)) {
			return;
		}

		if (key in this.sources) {
			if (type === this.sources[key].type) {
				this.sources[key] = {
					...this.sources[key],
					value
				};
			}
		} else {
			this.sources[key] = {
				value,
				type,
				name: key
			}
		}
	}
}

addSourceProviderType(MyFirstProvider);
