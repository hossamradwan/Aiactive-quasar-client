<template>
  <div>
    <grid-layout
      :layout.sync="layout"
      :col-num="colNum"
      :row-height="30"
      :responsive="false"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :vertical-compact="false"
      :use-css-transforms="true"
      :autoSize="true"
      :maxRows="12 / Math.sqrt(devicesPerRow)"
    >
      <grid-item
        v-for="(item, index) in layout"
        :key="index"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <video-feed :index="index" />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import { GridLayout, GridItem } from "vue-grid-layout";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  components: {
    GridLayout,
    GridItem,
    "video-feed": require("components/Vms/Modals/VideoFeed").default
  },
  data() {
    return {
      layout: [{ x: 0, y: 0, w: 12, h: 12, i: 0 }],
      draggable: true,
      resizable: true,
      colNum: 12,
      index: 0
    };
  },
  mounted() {
    // this.$gridlayout.load();
    this.index = this.layout.length;
  },
  computed: {
    ...mapState("facial", [
      "selectedCameraIndex",
      "devicesPerRow",
      "activeDevices",
      "url"
    ]),
    ...mapGetters("facial", ["cameras"])
  },
  methods: {
    addItem: function() {
      // Add a new item. It must have a unique key!
      let lastItem = this.layout[this.layout.length - 1];
      let x = lastItem.x + lastItem.w < 12 ? lastItem.x + lastItem.w : 0;
      let y =
        lastItem.x + lastItem.w >= 12 ? lastItem.y + lastItem.h : lastItem.y;

      this.layout.push({
        x: x,
        y: y, // puts it at the bottom
        w: this.layout[0].w,
        h: this.layout[0].h,
        i: this.index
      });
      // Increment the counter to ensure key is always unique.
      this.index++;
    },

    removeItem: function(val) {
      const index = this.layout.map(item => item.i).indexOf(val);
      this.layout.splice(index, 1);
    },

    setGrid() {
      //Resize and Modify Location Function
      let resize = () => {
        for (var i = 0; i < this.layout.length; i++) {
          // Resize
          // Divide Total (Row or Hieght) numbers over the square root of the total number of items
          this.layout[i].h = 12 / Math.sqrt(this.devicesPerRow);
          this.layout[i].w = 12 / Math.sqrt(this.devicesPerRow);

          // Relocate
          // Locate new item after last item position
          // If Last item is at the end then locate the new item to a new line
          if (i != 0) {
            let previousItem = this.layout[i - 1];
            this.layout[i].x =
              previousItem.x + previousItem.w < 12
                ? previousItem.x + previousItem.w
                : 0;
            this.layout[i].y =
              previousItem.x + previousItem.w > 11
                ? previousItem.y + previousItem.h
                : previousItem.y;
          }
        }
      };
      let difference = this.devicesPerRow - this.layout.length;
      if (difference > 0) {
        resize();
        // Add
        for (var i = 0; i < difference; i++) {
          this.addItem();
        }
      } else if (difference < 0) {
        // Delete
        this.layout.splice(difference);
        resize();
      }
    }
  },
  watch: {
    devicesPerRow: function() {
      this.setGrid();
    }
  }
};
</script>

<style>
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}
.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}
/*************************************/
.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
}
.vue-grid-layout {
  /* background: #eee; */
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: rgb(0, 0, 0);
  /* border: 1px solid black; */
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  background: #cce;
}
.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item .minMax {
  font-size: 12px;
}
.vue-grid-item .add {
  cursor: pointer;
}
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
