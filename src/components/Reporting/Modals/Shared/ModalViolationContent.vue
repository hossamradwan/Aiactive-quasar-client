<template>
  <section slot="pdf-content" class="pdf-content">
    <div
      id="loop"
      v-for="violation in violationToPrint"
      :key="violation.id"
      class="A4"
      dir="rtl"
    >
      <!-- Header Right -->
      <div class="logo">
        <p class="titles">مديرية أمن الاسماعيلية</p>
        <p class="titles">ادارة مرور الاسماعيلية</p>
      </div>
      <!-- Header Center -->
      <div class="lable">
        <p class="titles">نموذج ١٢٥ مرور</p>
        <p class="titles">تقرير مخالفة مرور</p>
      </div>
      <div class="receipt-container textt">
        <!-- Column Right -->
        <div class="columnn 1">
          <div>
            <p>
              <span> :بتاريخ </span>
              <span> {{ violation.date_time.split(",")[0] }} </span>
              &emsp;
              <span> :الساعة </span>
              <span> {{ violation.date_time.split(",")[1] }} </span>
              &emsp;
              <span> :بجهة </span>
              <span>______</span>
            </p>
            <p>
              <span> اسم المخالف </span>
              <span>________________:</span>
              &emsp;
              <span> :عنوانه </span>
              <span>_________</span>
            </p>
            <p>
              <span> رقم رخصة القيادة </span>
              <span>______:</span>
              &emsp;
              <span> نوعها و جهة صدورها </span>
              <span>______:</span>
            </p>
            <p>
              <span> رقم المركبة </span>
              <span> : </span>
              <span> {{ violation.plate_number }} </span>
            </p>
            <p
              style="text-align: center;
                            
                            margin-left: auto;
                            margin-right: auto;"
            >
              وصف الاتهام
            </p>
            <p
              style="text-align: center;
                            
                            margin-left: auto;
                            margin-right: auto;"
            >
              ________________
            </p>
            <p>
              <span> تم سحب رخصة القيادة </span>
              <span>(_________) </span>
              <span>&emsp;التسيير</span>
              <span>(_________) </span>
            </p>
            <p>
              <span>مدة الايقاف </span>
              <span>(____________)</span>
              <span>&emsp; الغاء </span>
              <span>(____________)</span>
              <span> م </span>
            </p>
            <p>
              <span>تم التصالح بالايصال رقم</span>
              <span>________________:</span>
            </p>
            <p>
              <span>اسم و رتبة شاهد المخالفة</span>
              <span>_____________:</span>
              &emsp;
              <span>التوقيع</span>
              <span>_____:</span>
            </p>
          </div>
        </div>

        <!-- Column Left -->
        <div class="columnn 2">
          <div>
            <p
              style="text-align: center;
                            float: inline-end;
                            margin-left: auto;
                            margin-right: auto;"
            >
              بيانات خاصة بنيابة المرور
            </p>
            <p>
              <span>:بتاريخ</span>
              <span></span>
            </p>
            <p>
              <span>:نحن</span>
              <span>________________________________</span>
              &emsp;
              <span>نحن</span>
            </p>
            <p>
              <span>القائم بأعمال نيابة المرور </span>
              <span> ___________ </span>

              <span>نأمر بتغريم المخالف</span>
            </p>
            <p>
              <span>:مبلغ</span>
              <span> ________________________________</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>قرش</span>
            </p>
            <p>
              <span>كود المخالفة </span>
              <span>________________:</span>
            </p>
            <p>
              <span>رقم القضية </span>
              <span>_________________:</span>
            </p>
            <p style="float:left">
              <span style=" align-self: center;">وكيل النيابة</span>

              <br />
              <span>__________</span>
            </p>

            <br />
            <p>
              <img
                :src="violation.path + '/' + violation.source1"
                style="height:150px; width:300px;  float:left;"
                onError="removeElement(this);"
              />
            </p>
          </div>
        </div>
      </div>
      <br />
      <!-- Half Page Bottom Parent -->
      <div class="full-width row  justify-center  content-center ">
        <!-- Child Row 1 -->

        <div class="col-12  self-stretch full-width row  justify-center  ">
          <img
            :src="violation.path + '/' + violation.source1"
            class=" q-pa-xs "
            onError="removeElement(this);"
          />
          <img
            :src="violation.path + '/' + violation.source1"
            class=" q-pa-xs "
            onError="removeElement(this);"
          />
          <img
            :src="violation.path + '/' + violation.source1"
            class=" q-pa-xs "
            onError="removeElement(this);"
          />
        </div>

        <!-- Child Row 2 -->
        <img
          :src="violation.path + '/' + violation.source2"
          class=" q-pa-xs col-auto       self-center"
          style="max-height:8cm"
          onError="removeElement(this);"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    removeElement(element) {
      element.remove();
    }
  },
  computed: {
    ...mapState("reporting", ["violationToPrint"])
  },

  mounted() {}
};
</script>
<style lang="css">
.A4 {
  width: 21cm;
  max-height: 28cm;
  padding: 20px;
  font-family: "Times New Roman", Times, serif;
  page-break-after: always;
}
.A4:last-child {
  page-break-after: auto;
}

.logo {
  text-align: left;
  margin-left: 7%;
  margin-top: 5px;
}
.lable {
  text-align: center;
}
.titles {
  font-size: 12pt;
  font-weight: bold;
  margin-bottom: 2pt;
}
.receipt-container {
  display: flex;
  width: 100%;
}
.columnn {
  display: flex;
  width: 100%;
  border-style: solid;
  border-width: 2px;
  padding: 10px;
}
div {
  margin-bottom: 0px;
}

.textt {
  font-size: 12pt;
  font-weight: normal;
  margin: 1pt;
  border: 4;
}
.center {
  text-align: center;
  float: inline-end;
  margin-left: auto;
  margin-right: auto;
}
.lefttt {
  float: left;
}
.righttt {
  text-align: right;
  float: right;
}
</style>
