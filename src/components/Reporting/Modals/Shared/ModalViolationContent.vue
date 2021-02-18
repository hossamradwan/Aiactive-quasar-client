<template>
  <div>
    <div id="loop" v-for="violation in violationToPrint" :key="violation.id">
      <div class="A4">
        <div id="A4-form" dir="rtl">
          <!-- Header Right -->
          <div ref="testHtml">
            <div>
              <div class="logo">
                <p class="titles">مديرية أمن الاسماعيلية</p>
                <p class="titles">ادارة مرور الاسماعيلية</p>
              </div>
              <!-- Header Center -->
              <div class="lable">
                <p class="titles">نموذج ١٢٥ مرور</p>
                <p class="titles">تقرير مخالفة مرور</p>
              </div>
            </div>
          </div>
          <div class="receipt-container">
            <!-- Column Right -->
            <div class="columnn 1">
              <div class="textt">
                <p>
                  <span> :بتاريخ </span>
                  <span> {{ violation.date_time.split(",")[0] }} </span>
                  &emsp;
                  <span> :الساعة </span>
                  <span> {{ violation.date_time.split(",")[1] }} </span>
                  &emsp;
                  <span> :بجهة </span>
                  <span>________</span>
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
                  <span>تم سحب رخصة القيادة </span>
                  <span>____________(</span>
                  <span>)&emsp;التسيير(</span>
                  <span>_________</span>
                  <span>)</span>
                </p>
                <p>
                  <span>مدة الايقاف(</span>
                  <span>_____________</span>
                  <span>)&emsp; الغاء (</span>
                  <span>________________</span>
                  <span>) م</span>
                </p>
                <p>
                  <span>تم التصالح بالايصال رقم:</span>
                  <span>________________</span>
                </p>
                <p>
                  <span>:اسم و رتبة شاهد المخالفة</span>
                  <span>_____________</span>
                  &emsp;
                  <span>:التوقيع</span>
                  <span>_____</span>
                </p>
              </div>
            </div>

            <!-- Column Left -->
            <div class="columnn 2">
              <div class="text">
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
                  <span> _______________ </span>

                  <span>نأمر بتغريم المخالف</span>
                </p>
                <p>
                  <span>:مبلغ</span>
                  <span> ________________________________</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>قرش</span>
                </p>
                <p>
                  <span>:كود المخالفة </span>
                  <span>________________</span>
                </p>
                <p>
                  <span>:رقم القضية </span>
                  <span>_________________</span>
                </p>
                <p style="float:left">وكيل النيابة</p>
                <br />
                <p style="float:left; text-align: left">
                  ________________
                </p>
                <br />
                <p>
                  <img
                    src="http://localhost:8080/ftp/5.jpg"
                    style="height:150px; width:300px;  float:left;"
                  />
                </p>
              </div>
            </div>
          </div>
          <br />
          <img
            src="http://localhost:8080/ftp/4.jpg"
            style="height:150px; width:6.5cm;  "
          />
          <img
            src="http://localhost:8080/ftp/3.jpg"
            style="height:150px; width:6.5cm;  "
          />
          <img
            src="http://localhost:8080/ftp/2.jpg"
            style="height:150px; width:6.5cm;  "
          />
          <img
            src="http://localhost:8080/ftp/1.jpg"
            style="width:21cm;
            height:8cm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      printPreview: false
    };
  },

  watch: {
    doPrint: function(newVal, oldVal) {
      if (newVal) this.Print();
    }
  },

  methods: {
    Print() {
      console.log("printing", this.violationToPrint);
      window.print();
    }
  },
  computed: {
    ...mapState("reporting", ["violationToPrint"])
  },

  mounted() {}
};
</script>
<style lang="css">
@media print {
  #printed-form {
    page-break-after: always;
  }
}

.A4 {
  width: 21cm;
  max-height: 29.7cm;
  padding: 10px;
  font-family: "Times New Roman", Times, serif;
  page-break-after: always;
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
  border-color: red;
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

.img {
  max-height: 50%;
  width: auto;
  align-content: center;
}
</style>
