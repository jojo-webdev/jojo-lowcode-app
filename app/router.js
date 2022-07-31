import { Route, UndefinedRoute } from "jojo-lowcode/router"

/*
* -------------------------------------------------
* Views and global Components
* -------------------------------------------------
*/

import "/resources/components/404/404.js"
import "/resources/views/index.js"

/*
* -------------------------------------------------
* Application's routes
* -------------------------------------------------
*/

Route.public({ path: '/', view: 'index' });

/*
* -------------------------------------------------
* Catch undefined route
* -------------------------------------------------
*/

UndefinedRoute(document.createElement('page-404'))