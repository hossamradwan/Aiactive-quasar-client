import config from "@/../config/config";
import { Loading, Notify } from "quasar";
import Axios from "axios";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { responseErrorMessage } from "./../functions/function-response-Error-Message";

const state = {
  // Removing Host Port
  host: config.API_URL.substring(0, config.API_URL.length - 4),
  port: 5006,
  screenToShow: null,
  selectedCameraIndex: null,
  cameras: [
    {
      cameraId: 0,
      url: 1,
      videoFeedUrl: "https://picsum.photos/576/222",
      faceDetection: false,
      faceRecognition: false
    },
    {
      cameraId: 1,
      url: 1,
      videoFeedUrl: "https://picsum.photos/333/975",
      faceDetection: false,
      faceRecognition: false
    },
    {
      cameraId: 2,
      url: 1,
      videoFeedUrl: "https://picsum.photos/536/444",
      faceDetection: false,
      faceRecognition: false
    },
    {
      cameraId: 3,
      url: 1,
      videoFeedUrl: "https://picsum.photos/555/974",
      faceDetection: false,
      faceRecognition: false
    }
  ]
};

const mutations = {
  // Add New Camera to state if not exists
  addCamera(state, payload) {
    let exists = state.cameras.find(
      ({ cameraId }) => cameraId === payload.cameraId
    );
    if (!exists) {
      state.cameras.push((window["camera_" + payload.cameraId] = payload));
    } else {
      showErrorMessage("Already Exists");
    }
    // Change View to Added Camera
    // state.screenToShow = state.cameras.findIndex(
    //   x => x.cameraId === payload.cameraId
    // );

    state.selectedCameraIndex = payload.cameraId;
    // state.selectedCameraIndex = state.cameras.findIndex(
    //   x => x.cameraId === payload.cameraId
    // );
  },

  // Remove Stopped Camera from State
  removeCamera(state, payload) {
    let index = state.cameras.findIndex(x => x.cameraId === payload);
    state.cameras.splice(index, 1);
  },

  resetSelectedCameraIndex(state) {
    // state.screenToShow = null;
    state.selectedCameraIndex = null;
  },

  // Enable FaceDetection Flag
  enableFaceDetection(state, payload) {
    let index = state.cameras.findIndex(x => x.cameraId === payload.cameraId);
    state.cameras[index].faceDetection = payload.value;
  },
  // updateFaceDetection
  updateDetection(state, payload) {
    console.log("payload value:", payload.value);
    // console.log(state.cameras);
    if (payload.value) {
      // recognitioon
      state.cameras[payload.index].faceRecognition = payload.value;
    } else if (payload.value == null) {
      // detection
      state.cameras[payload.index].faceDetection = true;
    } else {
      //false
      state.cameras[payload.index].faceDetection = payload.value;
      state.cameras[payload.index].faceRecognition = payload.value;
    }
  },

  // Enable FaceRecognition Flag
  enableFaceRecognition(state, payload) {
    let index = state.cameras.findIndex(x => x.cameraId === payload.cameraId);
    state.cameras[index].faceRecognition = true;
  }
};

const actions = {
  // Add New Camera or Play Previously Paused Camera
  addDevice({ commit }, payload) {
    // console.log("Action payload:", payload);
    let newDevice, status;

    // If Adding New Camera
    if (typeof payload === "object") {
      status = "add";
      newDevice = payload;
      // If Playing Paused Camera
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
              Notify.create(response.data.message);
            }
            //   Get number from response string
            let responseId = response.data.data.replace(/[^\d.]/g, "");

            //add responseId to the payload object
            let cameraId = parseInt(responseId);

            // add VideoFeed URL to the payload Object
            let videoFeedUrl =
              state.host + state.port + "/video_feed/" + cameraId;

            // Create A Camera Object in the state
            let newCamera = {
              ...payload,
              cameraId,
              videoFeedUrl,
              faceDetection: false,
              faceRecognition: false
            };
            // Add New Camera To State
            if (status == "add") {
              commit("addCamera", newCamera);
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

  // Stop and Remove a Camera
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

  // Pause Camera Stream
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

  // FaceDetection & FaceRecognition Update
  updateFaceDetection({ commit }, payload) {
    console.log("Action payload:", payload);
    // payload >> {index: 0, value: true, cameraId: -1}
    Loading.show();
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        let api = state.host + state.port;
        if (payload.value) {
          api += "/face_recognition/";
        } else if (payload.value == null) {
          api += "/face_detection/";
        } else {
          api += "/remove_facial/";
        }
        api += payload.cameraId;
        Axios.get(api)
          .then(response => {
            // console.log("payload.cameraId:", payload);
            commit("updateDetection", payload);
          })
          .catch(error => {
            responseErrorMessage(error);
          })
          //   TODO: Button loading
          .finally(Loading.hide());
      });
    }, 500);
  },

  // Train Dataset on new faces
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
  cameras: state => state.cameras,
  message: state => state.message
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
