import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Uncomment below if you need to enable production mode manually
// enableProdMode();

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));
