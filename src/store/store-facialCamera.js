import config from "@/../config/config";
import { Loading } from "quasar";
import Axios from "axios";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { responseErrorMessage } from "./../functions/function-response-Error-Message";

const state = {
  // Removing Host Port
  host: config.API_URL.substring(0, config.API_URL.length - 4),
  port: 5006,
  cameras: [
    // {
    //   cameraId: -1,
    //   url: 1,
    //   videoFeedUrl: "https://picsum.photos/536/974"
    // }
  ]
};

const mutations = {
  addCamera(state, payload) {
    console.log("payload:", payload);
    let exists = state.cameras.find(
      ({ cameraId }) => cameraId === payload.cameraId
    );
    if (!exists) {
      state.cameras.push((window["camera_" + payload.cameraId] = payload));
    } else {
      showErrorMessage("Already Exists");
    }
  },
  removeCamera(state, payload) {
    let index = state.cameras.findIndex(x => x.cameraId === payload);
    state.cameras.splice(index, 1);
  },
  enableFaceDetection(state, payload) {
    let index = state.cameras.findIndex(x => x.cameraId === payload.cameraId);
    state.cameras[index].faceDetection = true;
  },
  enableFaceRecognition(state, payload) {
    let index = state.cameras.findIndex(x => x.cameraId === payload.cameraId);
    state.cameras[index].faceRecognition = true;
  }
};

const actions = {
  addDevice({ commit }, payload) {
    console.log("action payload:", payload);
    // console.log("Action payload:", payload);
    let newDevice;
    let status;
    if (typeof payload === "object") {
      status = "add";
      newDevice = payload;
    } else if (typeof payload == "number") {
      status = "play";
      let index = state.cameras.findIndex(x => x.cameraId === payload);
      newDevice = state.cameras[index];
    }
    Loading.show();
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        let api = state.host + state.port + "/add_device";

        Axios.post(api, newDevice)
          .then(response => {
            // console.log("response:", response);
            if (response.status == 226) {
              showErrorMessage(response.data.message);
            }
            //   Get number from response string
            let responseId = response.data.data.replace(/[^\d.]/g, "");

            //add responseId to the payload object
            let cameraId = parseInt(responseId);

            // add VideoFeed URL to the payload Object
            let videoFeedUrl =
              state.host + state.port + "/video_feed/" + cameraId;
            // console.log("response payload:", payload);
            // Create A Camera Object in the state
            let newCamera = {
              ...payload,
              cameraId,
              videoFeedUrl,
              faceDetection: false,
              faceRecognition: false
            };
            // console.log("newCamera:", newCamera);
            if (status == "add") {
              commit("addCamera", newCamera);
            } else if (status == "play") {
              commit("addCamera", newDevice);
            }
            // }
          })
          .catch(error => {
            responseErrorMessage(error);
          })
          //   TODO: Button loading
          .finally(Loading.hide());
      });
    }, 500);
  },
  removeDevice({ commit }, payload) {
    // console.log("Action payload:", payload);
    Loading.show();
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        let api = state.host + state.port + "/terminate/" + payload;

        Axios.get(api)
          .then(response => {
            // console.log("payload.cameraId:", payload);
            commit("removeCamera", payload);
          })
          .catch(error => {
            responseErrorMessage(error);
          })
          //   TODO: Button loading

          .finally(Loading.hide());
      });
    }, 500);
  },
  pauseDevice({ commit }, payload) {
    // console.log("Action payload:", payload);
    Loading.show();
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        let api = state.host + state.port + "/close/" + payload;

        Axios.get(api)
          .then(response => {
            // console.log("payload.cameraId:", payload);
          })
          .catch(error => {
            responseErrorMessage(error);
          })
          //   TODO: Button loading
          .finally(Loading.hide());
      });
    }, 500);
  },
  enableFaceDetection({ commit }, payload) {
    // console.log("enableFaceDetection payload:", payload);
    Loading.show();
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        let api =
          state.host + state.port + "/face_detection/" + payload.cameraId;

        Axios.get(api)
          .then(response => {
            // console.log("payload.cameraId:", payload);
            commit("enableFaceDetection", payload);
          })
          .catch(error => {
            responseErrorMessage(error);
          })
          //   TODO: Button loading
          .finally(Loading.hide());
      });
    }, 500);
  },
  enableFaceRecognition({ commit }, payload) {
    // console.log("enableFaceRecognition payload:", payload);
    Loading.show();
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        let api =
          state.host + state.port + "/face_recognition/" + payload.cameraId;

        Axios.get(api)
          .then(response => {
            // console.log("payload.cameraId:", payload);
            commit("enableFaceRecognition", payload);
          })
          .catch(error => {
            responseErrorMessage(error);
          })
          //   TODO: Button loading
          .finally(Loading.hide());
      });
    }, 500);
  },
  trainDataset() {
    Loading.show();
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        let api = state.host + state.port + "/train_dataset";
        Axios.get(api)
          .then(response => {})
          .catch(error => {
            responseErrorMessage(error);
          })
          //   TODO: Button loading
          .finally(Loading.hide());
      });
    }, 500);
  }
};

const getters = {
  cameras: state => state.cameras
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
