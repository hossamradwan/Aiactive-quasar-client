import { LocalStorage } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";



export default async ({ router, store }) => {
  let loggedIn = LocalStorage.getItem("loggedIn");
  let loggedInUser = LocalStorage.getItem("loggedInUser");

  // try using token only to retrieve user session

  
  router.beforeEach((to, form, next) => {

    // let loggedIn = store.state.auth.loggedIn
    // let loggedInUser = store.state.auth.userData

    if (!loggedIn && to.path !== "/auth") {
      next("/auth");
    } 
    else {
      if (loggedInUser != null && loggedIn) {

        // if user not active and try to login
        if (!loggedInUser.isActive) {
          LocalStorage.remove("loggedIn");
          LocalStorage.remove("loggedInUser");
          LocalStorage.remove("loggedInUserToken");
          showErrorMessage("your Account is Disabled..");
          return;
        }

        // if user not admin and try to open settings
        if(!loggedInUser.isAdmin && to.path == "/settings") {
          console.log("to auth");
          next("/userProfile")
          return // to avoid db click on settings hack and open
        }

      }

      next();
    }
  });
};
