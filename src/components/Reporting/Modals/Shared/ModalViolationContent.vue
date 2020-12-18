<template>
    <div class="printed-form">
        <table
          style="page-break-after: always;"
          v-for="violation in violationToPrint"
          :key="violation.id"
          :id="violation.id"
          border="3"
          cellpadding="1"
          class="q-mt-lg A4">
            <tbody>

                <!-- Ticket Header Row -->
                <tr style="height: 35px;">
                    <td style="height: 35px;" colspan="4" width="720">
                        <p style="text-align: center;">&nbsp;مخالفة سرعه </p>
                    </td>
                </tr>

                <!-- Images Row -->
                <tr style="height: 35px;">
                    <td style="height: 35px;" colspan="4" width="720">
                        <figure class="figure" style="width:141px;height:114px;padding:5px;">
                                <img class="img-fluid figure-img" :src="violation.path + '/' + violation.source1">
                        </figure>
                        <figure class="figure" style="width:141px;height:114px;padding:5px;">
                                <img class="img-fluid figure-img" :src="violation.path + '/' + violation.source2">
                        </figure>
                    </td>
                </tr>

                <!-- PlateNumber and Driver Face Header Row -->
                <tr style="height: 35px;">
                    <td style="height: 35px;" colspan="2" width="371">
                        <p style="text-align: center;">وﺟه اﻟﺳﺎﺋﻖ</p>
                    </td>
                    <td style="height: 35px;" colspan="2" width="349">
                        <p style="text-align: center;"> رﻗم اﻟﻠوﺣه </p>
                    </td>
                </tr>
                <!-- PlateNumber and Driver Face Data Row -->
                <tr style="height: 35px;">
                    <td style="height: 35px;" colspan="2" width="371">
                        <p>&nbsp;</p>
                    </td>
                    <td style="height: 35px; text-align: center;" colspan="2" width="349">
                        &nbsp; {{ violation.plate_number }} </td>
                </tr>

                <!-- Ticket Number and Date Time Header Row -->
                <tr style="height: 59px;">
                    <td style="height: 59px;" width="264">
                        <p style="text-align: center;">&nbsp; {{ violation.date_time }} </p>
                    </td>
                    <td style="height: 59px;" width="107">
                        <p>&nbsp;</p>
                        <p style="text-align: right;">اﻟﺗوﻗﯾت</p>
                    </td>
                    <td style="height: 59px;" colspan="2" width="349">
                        <p>&nbsp;</p>
                        <p style="text-align: right;">ﻧﻣوذج رﻗم 125 ﻣرور</p>
                    </td>
                </tr>

                <!-- Radar Number and Violation Speed Row -->
                <tr style="height: 35px;">
                    <td style="height: 35px;" width="264">
                        <p style="text-align: center;">ﻛم<em>/</em>ﺳﺎعه  {{ violationToPrint.speed / 100 }}  </p>
                    </td>
                    <td style="height: 35px;" width="107">
                        <p style="text-align: right;">اﻟﺳرﻋه اﻟﻣﺧﺎﻟفه </p>
                    </td>
                    <td style="height: 70px;" colspan="2" rowspan="2" width="349">
                        <p style="text-align: right;">وﺣدة اﻟرادار</p>
                    </td>
                </tr>


                <!-- Caugth Date Row -->
                <tr style="height: 35px;">
                    <td style="height: 35px;" width="264">
                        <p style="text-align: center;"></p>
                    </td>
                    <td style="height: 35px;" width="107">
                        <p style="text-align: right;">ﺗﺎرﯾﺦ اﻟﺿﺑط</p>
                    </td>
                </tr>

                <!-- Device Number and Road Name Row -->
                <tr style="height: 35px;">
                    <td style="height: 35px;" width="264">
                        <p style="text-align: center;">اﻟﻣﺣور</p>
                    </td>
                    <td style="height: 35px;" width="107">
                        <p style="text-align: right;">اﻟطرﯾﻖ</p>
                    </td>
                    <td style="height: 105px;" colspan="2" rowspan="3" width="349">
                        <p>&nbsp;</p>
                        <p
                        style="text-align: right;">جهاز
                        رقم
                        &nbsp;&nbsp;
                        {{
                        violation.device_name
                        }}</p>
                        <p>&nbsp;</p>
                    </td>
                </tr>

                <!-- Radar Device Number Row -->
                <tr style="height: 35px;">
                    <td style="height: 35px;" width="264">
                        <p style="text-align: center;"></p>
                    </td>
                    <td style="height: 35px;" width="107">
                        <p style="text-align: right;">&nbsp;&nbsp;&nbsp; رﻗم ﺟﮭﺎز اﻟرادار</p>
                    </td>
                </tr>

                <!-- Caught Place Row -->
                <tr style="height: 35px;">
                    <td style="height: 35px;" width="264">
                        <p style="text-align: center;">&nbsp;طريق&nbsp;</p>
                    </td>
                    <td style="height: 35px;" width="107">
                        <p style="text-align: right;">ﻣﻛﺎن اﻟﺿﺑط</p>
                    </td>
                </tr>

                <!-- Legal Speed Limit with traffic violation header -->
                <tr style="height: 35px;">
                    <td style="height: 70px;" rowspan="2" width="264">
                        <p style="text-align: center;">90 ﻛم<em>/</em>ﺳﺎﻋه </p>
                    </td>
                    <td style="height: 70px;" rowspan="2" width="107">
                        <p style="text-align: right;">الحد القانونى للسرعه</p>
                    </td>
                    <td style="height: 35px;" colspan="2" width="349">
                        <p style="text-align: center;">ﺗﻘرﯾر ﻣﺧﺎﻟﻔﺔ ﻣرور</p>
                    </td>
                </tr>

                <!-- Report Date Row -->
                <tr style="height: 35px;">
                    <td style="height: 35px;" width="235">&nbsp; {{ violation.date_time }} </td>
                    <td style="height: 35px;" width="114">
                        <p style="text-align: right;">اﻟﺗﺎرﯾﺦ </p>
                    </td>
                </tr>

                <!-- vehicle class with plate_number -->
                <tr style="height: 35px;">
                    <td style="height: 35px;" width="264">&nbsp;</td>
                    <td style="height: 35px;" width="107">
                        <p style="text-align: right;">ﺗﺻﻧﯾف اﻟﻣرﻛﺑﺔ</p>
                    </td>
                    <td style="height: 35px;" width="235">
                        <p style="text-align: center;"> {{ violation.plate_number }} </p>
                    </td>
                    <td style="height: 35px;" width="114">
                        <p style="text-align: right;">رﻗم اﻟﻣرﻛﺑه </p>
                    </td>
                </tr>

                <!-- Lane number with charge description -->
                <tr style="height: 35px;">
                    <td style="height: 35px;" width="264">
                        <p style="text-align: center;">ﺣﺎرة ۱ ﺷﻣﺎل</p>
                    </td>
                    <td style="height: 35px;" width="107">
                        <p style="text-align: right;">ﺟﮭﺔ اﻟﺳﯾر</p>
                    </td>
                    <td style="height: 35px;" width="235">
                        <p style="text-align: center;">ﺗﺟﺎوز اﻟﺳرﻋﺔ اﻟﻣﻘررة</p>
                    </td>
                    <td style="height: 35px;" width="114">
                        <p style="text-align: right;">وﺻف اﻹﺗﮭﺎم</p>
                    </td>
                </tr>

                <!-- Officer Name and signture -->
                <tr style="height: 35px;">
                    <td style="height: 94px;" colspan="2" rowspan="2" width="371">
                        <p>&nbsp;</p>
                    </td>
                    <td style="height: 35px;" width="235">
                        <p style="text-align: right;">&nbsp;</p>
                    </td>
                    <td style="height: 35px;" width="114">
                        <p style="text-align: right;">إﺳم اﻟﺿﺎﺑط</p>
                    </td>
                </tr>
                <tr style="height: 59px;">
                    <td style="height: 59px;" width="235">
                        <p>&nbsp;</p>
                    </td>
                    <td style="height: 59px;" width="114">
                        <p>&nbsp;</p>
                        <p style="text-align: right;">اﻟﺗوﻗﯾﻊ</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
	export default {
		props: ['doPrint', 'violationToPrint'],

		data() {
			return {

			}
        },
        
        watch: {
            'doPrint': function(newVal, oldVal) {
                if(newVal)
                    this.Print();
            }
        },

        methods: {
            Print() {
                console.log('printing', this.violationToPrint);
                window.print();
            }
        },
		
		mounted() {

		}
	}
</script>
<style lang="css">

.A4 {
  width: 21cm;
  height: 29.7cm;
  border-style: dashed;
  padding: 10px;
  font-family: "Times New Roman", Times, serif;
}

@media print {
    .printed-form {
        margin: 0 auto;
    }
   

    .A4 {
        margin: 0 auto;
        width: 19cm;
        height: 24.7cm;
        /* border-style: dashed; */
        /* padding: 10px; */
        font-family: "Times New Roman", Times, serif;
    }

    /* Don't forget to uninstall vut-html-to-paper package */

     /* window.print()
        @media print {
            @page { margin: 0; }
            p { page-break-after: always; }
        }
        <p>Paragraph 1</p>
        <p>Paragraph 2</p> */
}
</style>
