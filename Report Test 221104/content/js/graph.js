/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 12.0, "series": [{"data": [[0.0, 3.0], [600.0, 1.0]], "isOverall": false, "label": "BP02_10_Select_Bank/transfer-types", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/batch", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/batch", "isController": false}, {"data": [[0.0, 7.0], [200.0, 1.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/sourceConfig", "isController": false}, {"data": [[0.0, 8.0]], "isOverall": false, "label": "BP02_02_Click_Login/batch", "isController": false}, {"data": [[0.0, 6.0], [100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/app-features", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/0fdb0840-d198-428a-8a43-2445c10999d2/DUITNOW_OUTWARD", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/duitnow-transfer", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa", "isController": false}, {"data": [[0.0, 4.0], [700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[0.0, 8.0]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/public/status", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/casa", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/balance", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa", "isController": false}, {"data": [[4900.0, 1.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/121485b5-5c09-45e8-84c7-e999982a0ae3/duitnow-inquiry", "isController": false}, {"data": [[2700.0, 1.0], [1400.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "BP02_14_EnterPasscode_Transfer/mfa-attempts", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/duitnow-transfer", "isController": false}, {"data": [[0.0, 4.0], [700.0, 1.0], [200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/app-features", "isController": false}, {"data": [[0.0, 8.0]], "isOverall": false, "label": "BP01_02_Click_Login/batch", "isController": false}, {"data": [[0.0, 3.0], [700.0, 1.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/activities/home/192922c5-9167-4026-ac18-eac2943c4b78", "isController": false}, {"data": [[3800.0, 1.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/5b0776eb-364e-4e13-b95b-c400139968c0/duitnow-inquiry", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "BP02_08_Click_NewTransfer/duitnow-ids", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "BP02_17_Click_Logout/public/status", "isController": false}, {"data": [[2400.0, 1.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/duitnow-inquiry", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/5b0776eb-364e-4e13-b95b-c400139968c0/balance", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/balance", "isController": false}, {"data": [[5300.0, 1.0], [700.0, 1.0], [800.0, 1.0], [1000.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/enter-passcode", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/121485b5-5c09-45e8-84c7-e999982a0ae3/balance", "isController": false}, {"data": [[0.0, 8.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/public/status", "isController": false}, {"data": [[0.0, 7.0], [800.0, 1.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/versions/ANDROID", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/0fdb0840-d198-428a-8a43-2445c10999d2/balance", "isController": false}, {"data": [[0.0, 3.0], [1100.0, 1.0]], "isOverall": false, "label": "BP01_16_Click_Done/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[2200.0, 1.0], [600.0, 1.0], [2800.0, 1.0], [3000.0, 1.0], [1600.0, 1.0], [200.0, 1.0], [3500.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/firebase-token", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/51bf2ddc-5e3c-4d81-b536-044772236f40/DUITNOW_OUTWARD", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/login", "isController": false}, {"data": [[4800.0, 1.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/duitnow-inquiry", "isController": false}, {"data": [[0.0, 8.0]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/sourceConfig", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/121485b5-5c09-45e8-84c7-e999982a0ae3/DUITNOW_OUTWARD", "isController": false}, {"data": [[0.0, 5.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/me", "isController": false}, {"data": [[5500.0, 1.0], [7000.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/mfa-attempts", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/DUITNOW_OUTWARD", "isController": false}, {"data": [[2300.0, 1.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/duitnow-inquiry", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "BP01_14_EnterPasscode_Transfer/batch", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/a654811b-14b5-43f3-ae34-637d52bbcf6d/DUITNOW_OUTWARD", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/DUITNOW_OUTWARD", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/balance", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "BP02_17_Click_Logout/batch", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/DUITNOW_OUTWARD", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/fa4e9a81-ba70-47ce-8566-ed6696702075/DUITNOW_OUTWARD", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "BP01_14_EnterPasscode_Transfer/mfa-attempts/7c4f49fd-14db-4396-b415-da4289fb857e", "isController": false}, {"data": [[0.0, 6.0], [2600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/me", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/95c40a1a-56cb-4699-9bb5-a0412392cf7e/DUITNOW_OUTWARD", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "BP02_17_Click_Logout/versions/ANDROID", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/balance", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[4700.0, 1.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/duitnow-inquiry", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 1.0], [6600.0, 1.0], [7400.0, 1.0], [3600.0, 1.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/enter-passcode", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/batch", "isController": false}, {"data": [[2800.0, 1.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/0fdb0840-d198-428a-8a43-2445c10999d2/duitnow-inquiry", "isController": false}, {"data": [[0.0, 8.0]], "isOverall": false, "label": "BP01_17_Click_Logout/versions/ANDROID", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/balance", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/DUITNOW_OUTWARD", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "BP01_17_Click_Logout/logout", "isController": false}, {"data": [[2300.0, 1.0], [300.0, 2.0], [2900.0, 1.0], [200.0, 1.0], [3900.0, 1.0], [500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/firebase-token", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/5b0776eb-364e-4e13-b95b-c400139968c0/balance", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "BP02_09_Click_AccountNumber/duitnow/bank", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/5b0776eb-364e-4e13-b95b-c400139968c0/DUITNOW_OUTWARD", "isController": false}, {"data": [[6300.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/mfa-attempts/7c4f49fd-14db-4396-b415-da4289fb857e", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/DUITNOW_OUTWARD", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/batch", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/batch", "isController": false}, {"data": [[0.0, 8.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/batch", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/batch", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "BP01_17_Click_Logout/batch", "isController": false}, {"data": [[0.0, 8.0]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/batch", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "BP01_10_Select_Bank/transfer-types", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/balance", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/balance", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/batch", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/0fdb0840-d198-428a-8a43-2445c10999d2/balance", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/95c40a1a-56cb-4699-9bb5-a0412392cf7e/balance", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/balance", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/0fdb0840-d198-428a-8a43-2445c10999d2/duitnow-transfer", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "BP02_14_EnterPasscode_Transfer/batch", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/balance", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "BP01_17_Click_Logout/soft-logout", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/duitnow-transfer", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/balance", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/5b0776eb-364e-4e13-b95b-c400139968c0/DUITNOW_OUTWARD", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/0fdb0840-d198-428a-8a43-2445c10999d2/DUITNOW_OUTWARD", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "BP02_17_Click_Logout/soft-logout", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "BP02_16_Click_Done/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/a654811b-14b5-43f3-ae34-637d52bbcf6d/DUITNOW_OUTWARD", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/batch", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/duitnow-transfer", "isController": false}, {"data": [[0.0, 7.0], [700.0, 1.0]], "isOverall": false, "label": "BP01_17_Click_Logout/public/status", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/fa4e9a81-ba70-47ce-8566-ed6696702075/DUITNOW_OUTWARD", "isController": false}, {"data": [[8700.0, 1.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/95c40a1a-56cb-4699-9bb5-a0412392cf7e/duitnow-inquiry", "isController": false}, {"data": [[0.0, 5.0], [400.0, 1.0]], "isOverall": false, "label": "BP01_09_Click_AccountNumber/duitnow/bank", "isController": false}, {"data": [[4100.0, 1.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/5b0776eb-364e-4e13-b95b-c400139968c0/duitnow-transfer", "isController": false}, {"data": [[0.0, 7.0], [200.0, 1.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/login", "isController": false}, {"data": [[0.0, 8.0]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/versions/ANDROID", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "BP02_17_Click_Logout/logout", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/duitnow-transfer", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/casa", "isController": false}, {"data": [[2200.0, 1.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/duitnow-inquiry", "isController": false}, {"data": [[4200.0, 1.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/duitnow-inquiry", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/51bf2ddc-5e3c-4d81-b536-044772236f40/DUITNOW_OUTWARD", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "BP01_08_Click_NewTransfer/duitnow-ids", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/balance", "isController": false}, {"data": [[0.0, 4.0], [600.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/home/1c47b49d-596b-48bb-8570-60b64b4884a0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 8700.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 9.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 343.0, "series": [{"data": [[0.0, 343.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 32.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 29.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 9.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.66754484E12, "maxY": 1.0, "series": [{"data": [[1.66754508E12, 1.0], [1.6675449E12, 1.0], [1.66754502E12, 1.0], [1.66754484E12, 1.0], [1.66754496E12, 1.0]], "isOverall": false, "label": "172.21.10.143-BP_01DuitNowTransferwithinBank", "isController": false}, {"data": [[1.66754508E12, 1.0], [1.6675449E12, 1.0], [1.66754502E12, 1.0], [1.66754484E12, 1.0], [1.66754496E12, 1.0]], "isOverall": false, "label": "172.21.10.149-BP_02DuitNowTransferwithinOtherBank", "isController": false}, {"data": [[1.6675449E12, 1.0], [1.66754484E12, 1.0]], "isOverall": false, "label": "172.21.10.143-BP_02DuitNowTransferwithinOtherBank", "isController": false}, {"data": [[1.66754508E12, 1.0], [1.6675449E12, 1.0], [1.66754502E12, 1.0], [1.66754484E12, 1.0], [1.66754496E12, 1.0]], "isOverall": false, "label": "172.21.10.181-BP_01DuitNowTransferwithinBank", "isController": false}, {"data": [[1.66754508E12, 1.0], [1.6675449E12, 1.0], [1.66754502E12, 1.0], [1.66754484E12, 1.0], [1.66754496E12, 1.0]], "isOverall": false, "label": "172.21.10.149-BP_01DuitNowTransferwithinBank", "isController": false}, {"data": [[1.66754508E12, 1.0], [1.6675449E12, 1.0], [1.66754502E12, 1.0], [1.66754484E12, 1.0], [1.66754514E12, 1.0], [1.66754496E12, 1.0]], "isOverall": false, "label": "172.21.10.181-BP_02DuitNowTransferwithinOtherBank", "isController": false}, {"data": [[1.66754508E12, 1.0], [1.6675449E12, 1.0], [1.66754502E12, 1.0], [1.66754484E12, 1.0], [1.66754496E12, 1.0]], "isOverall": false, "label": "172.21.10.150-BP_02DuitNowTransferwithinOtherBank", "isController": false}, {"data": [[1.66754508E12, 1.0], [1.6675449E12, 1.0], [1.66754502E12, 1.0], [1.66754484E12, 1.0], [1.66754514E12, 1.0], [1.66754496E12, 1.0]], "isOverall": false, "label": "172.21.10.150-BP_01DuitNowTransferwithinBank", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66754514E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.0, "maxY": 8780.0, "series": [{"data": [[2.0, 181.0]], "isOverall": false, "label": "BP02_10_Select_Bank/transfer-types", "isController": false}, {"data": [[2.0, 181.0]], "isOverall": false, "label": "BP02_10_Select_Bank/transfer-types-Aggregated", "isController": false}, {"data": [[2.0, 31.333333333333332], [1.0, 10.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/batch", "isController": false}, {"data": [[1.75, 26.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/batch-Aggregated", "isController": false}, {"data": [[2.0, 13.5], [1.0, 14.5]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/batch", "isController": false}, {"data": [[1.5, 14.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/batch-Aggregated", "isController": false}, {"data": [[2.0, 43.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/sourceConfig", "isController": false}, {"data": [[2.0, 43.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/sourceConfig-Aggregated", "isController": false}, {"data": [[2.0, 17.124999999999996]], "isOverall": false, "label": "BP02_02_Click_Login/batch", "isController": false}, {"data": [[2.0, 17.124999999999996]], "isOverall": false, "label": "BP02_02_Click_Login/batch-Aggregated", "isController": false}, {"data": [[2.0, 117.25]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/app-features", "isController": false}, {"data": [[2.0, 117.25]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/app-features-Aggregated", "isController": false}, {"data": [[2.0, 39.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/0fdb0840-d198-428a-8a43-2445c10999d2/DUITNOW_OUTWARD", "isController": false}, {"data": [[2.0, 39.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/0fdb0840-d198-428a-8a43-2445c10999d2/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[2.0, 218.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/duitnow-transfer", "isController": false}, {"data": [[2.0, 218.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/duitnow-transfer-Aggregated", "isController": false}, {"data": [[2.0, 44.0], [1.0, 43.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa", "isController": false}, {"data": [[1.6666666666666667, 43.666666666666664]], "isOverall": false, "label": "BP02_16_Click_Done/casa-Aggregated", "isController": false}, {"data": [[2.0, 331.3333333333333]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[2.0, 331.3333333333333]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/notifications/customers?type=ANNOUNCEMENT-Aggregated", "isController": false}, {"data": [[2.0, 18.625]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/public/status", "isController": false}, {"data": [[2.0, 18.625]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/public/status-Aggregated", "isController": false}, {"data": [[2.0, 106.33333333333334]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/casa", "isController": false}, {"data": [[2.0, 106.33333333333334]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/casa-Aggregated", "isController": false}, {"data": [[2.0, 125.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/balance", "isController": false}, {"data": [[2.0, 125.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/balance-Aggregated", "isController": false}, {"data": [[2.0, 52.75]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa", "isController": false}, {"data": [[2.0, 52.75]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa-Aggregated", "isController": false}, {"data": [[2.0, 4946.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/121485b5-5c09-45e8-84c7-e999982a0ae3/duitnow-inquiry", "isController": false}, {"data": [[2.0, 4946.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/121485b5-5c09-45e8-84c7-e999982a0ae3/duitnow-inquiry-Aggregated", "isController": false}, {"data": [[2.0, 2054.0]], "isOverall": false, "label": "BP02_14_EnterPasscode_Transfer/mfa-attempts", "isController": false}, {"data": [[2.0, 2054.0]], "isOverall": false, "label": "BP02_14_EnterPasscode_Transfer/mfa-attempts-Aggregated", "isController": false}, {"data": [[2.0, 206.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/duitnow-transfer", "isController": false}, {"data": [[2.0, 206.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/duitnow-transfer-Aggregated", "isController": false}, {"data": [[2.0, 175.5]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/app-features", "isController": false}, {"data": [[2.0, 175.5]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/app-features-Aggregated", "isController": false}, {"data": [[2.0, 19.874999999999996]], "isOverall": false, "label": "BP01_02_Click_Login/batch", "isController": false}, {"data": [[2.0, 19.874999999999996]], "isOverall": false, "label": "BP01_02_Click_Login/batch-Aggregated", "isController": false}, {"data": [[2.0, 204.25]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/activities/home/192922c5-9167-4026-ac18-eac2943c4b78", "isController": false}, {"data": [[2.0, 204.25]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/activities/home/192922c5-9167-4026-ac18-eac2943c4b78-Aggregated", "isController": false}, {"data": [[2.0, 3826.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/5b0776eb-364e-4e13-b95b-c400139968c0/duitnow-inquiry", "isController": false}, {"data": [[2.0, 3826.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/5b0776eb-364e-4e13-b95b-c400139968c0/duitnow-inquiry-Aggregated", "isController": false}, {"data": [[2.0, 18.75]], "isOverall": false, "label": "BP02_08_Click_NewTransfer/duitnow-ids", "isController": false}, {"data": [[2.0, 18.75]], "isOverall": false, "label": "BP02_08_Click_NewTransfer/duitnow-ids-Aggregated", "isController": false}, {"data": [[2.0, 5.5], [1.0, 5.0]], "isOverall": false, "label": "BP02_17_Click_Logout/public/status", "isController": false}, {"data": [[1.6666666666666667, 5.333333333333334]], "isOverall": false, "label": "BP02_17_Click_Logout/public/status-Aggregated", "isController": false}, {"data": [[2.0, 2465.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/duitnow-inquiry", "isController": false}, {"data": [[2.0, 2465.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/duitnow-inquiry-Aggregated", "isController": false}, {"data": [[2.0, 100.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/5b0776eb-364e-4e13-b95b-c400139968c0/balance", "isController": false}, {"data": [[2.0, 100.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/5b0776eb-364e-4e13-b95b-c400139968c0/balance-Aggregated", "isController": false}, {"data": [[2.0, 125.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/balance", "isController": false}, {"data": [[2.0, 125.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/balance-Aggregated", "isController": false}, {"data": [[2.0, 1279.7499999999998]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/enter-passcode", "isController": false}, {"data": [[2.0, 1279.7499999999998]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/enter-passcode-Aggregated", "isController": false}, {"data": [[2.0, 813.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/121485b5-5c09-45e8-84c7-e999982a0ae3/balance", "isController": false}, {"data": [[2.0, 813.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/121485b5-5c09-45e8-84c7-e999982a0ae3/balance-Aggregated", "isController": false}, {"data": [[2.0, 13.25]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/public/status", "isController": false}, {"data": [[2.0, 13.25]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/public/status-Aggregated", "isController": false}, {"data": [[2.0, 114.12499999999999]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/versions/ANDROID", "isController": false}, {"data": [[2.0, 114.12499999999999]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/versions/ANDROID-Aggregated", "isController": false}, {"data": [[2.0, 854.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/0fdb0840-d198-428a-8a43-2445c10999d2/balance", "isController": false}, {"data": [[2.0, 854.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/0fdb0840-d198-428a-8a43-2445c10999d2/balance-Aggregated", "isController": false}, {"data": [[2.0, 28.0], [1.0, 410.0]], "isOverall": false, "label": "BP01_16_Click_Done/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[1.25, 314.5]], "isOverall": false, "label": "BP01_16_Click_Done/notifications/customers?type=ANNOUNCEMENT-Aggregated", "isController": false}, {"data": [[2.0, 2025.25]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/firebase-token", "isController": false}, {"data": [[2.0, 2025.25]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/firebase-token-Aggregated", "isController": false}, {"data": [[2.0, 23.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/51bf2ddc-5e3c-4d81-b536-044772236f40/DUITNOW_OUTWARD", "isController": false}, {"data": [[2.0, 23.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/51bf2ddc-5e3c-4d81-b536-044772236f40/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[2.0, 595.25]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/login", "isController": false}, {"data": [[2.0, 595.25]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/login-Aggregated", "isController": false}, {"data": [[2.0, 4889.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/duitnow-inquiry", "isController": false}, {"data": [[2.0, 4889.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/duitnow-inquiry-Aggregated", "isController": false}, {"data": [[2.0, 15.874999999999998]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/sourceConfig", "isController": false}, {"data": [[2.0, 15.874999999999998]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/sourceConfig-Aggregated", "isController": false}, {"data": [[2.0, 73.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/121485b5-5c09-45e8-84c7-e999982a0ae3/DUITNOW_OUTWARD", "isController": false}, {"data": [[2.0, 73.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/121485b5-5c09-45e8-84c7-e999982a0ae3/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[2.0, 76.625]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/me", "isController": false}, {"data": [[2.0, 76.625]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/me-Aggregated", "isController": false}, {"data": [[2.0, 6299.0], [1.0, 4030.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/mfa-attempts", "isController": false}, {"data": [[1.6666666666666667, 5542.666666666667]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/mfa-attempts-Aggregated", "isController": false}, {"data": [[2.0, 23.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/DUITNOW_OUTWARD", "isController": false}, {"data": [[2.0, 23.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[2.0, 2307.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/duitnow-inquiry", "isController": false}, {"data": [[2.0, 2307.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/duitnow-inquiry-Aggregated", "isController": false}, {"data": [[2.0, 23.5], [1.0, 25.5]], "isOverall": false, "label": "BP01_14_EnterPasscode_Transfer/batch", "isController": false}, {"data": [[1.5, 24.5]], "isOverall": false, "label": "BP01_14_EnterPasscode_Transfer/batch-Aggregated", "isController": false}, {"data": [[2.0, 22.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/a654811b-14b5-43f3-ae34-637d52bbcf6d/DUITNOW_OUTWARD", "isController": false}, {"data": [[2.0, 22.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/a654811b-14b5-43f3-ae34-637d52bbcf6d/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[1.0, 28.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.0, 28.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[2.0, 114.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/balance", "isController": false}, {"data": [[2.0, 114.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/balance-Aggregated", "isController": false}, {"data": [[2.0, 15.5], [1.0, 9.0]], "isOverall": false, "label": "BP02_17_Click_Logout/batch", "isController": false}, {"data": [[1.6666666666666667, 13.333333333333334]], "isOverall": false, "label": "BP02_17_Click_Logout/batch-Aggregated", "isController": false}, {"data": [[2.0, 24.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/DUITNOW_OUTWARD", "isController": false}, {"data": [[2.0, 24.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[1.0, 43.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/fa4e9a81-ba70-47ce-8566-ed6696702075/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.0, 43.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/fa4e9a81-ba70-47ce-8566-ed6696702075/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[2.0, 897.5], [1.0, 704.5]], "isOverall": false, "label": "BP01_14_EnterPasscode_Transfer/mfa-attempts/7c4f49fd-14db-4396-b415-da4289fb857e", "isController": false}, {"data": [[1.5, 801.0]], "isOverall": false, "label": "BP01_14_EnterPasscode_Transfer/mfa-attempts/7c4f49fd-14db-4396-b415-da4289fb857e-Aggregated", "isController": false}, {"data": [[2.0, 418.875]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/me", "isController": false}, {"data": [[2.0, 418.875]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/me-Aggregated", "isController": false}, {"data": [[2.0, 55.4], [1.0, 49.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa", "isController": false}, {"data": [[1.8333333333333335, 54.333333333333336]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa-Aggregated", "isController": false}, {"data": [[2.0, 53.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/95c40a1a-56cb-4699-9bb5-a0412392cf7e/DUITNOW_OUTWARD", "isController": false}, {"data": [[2.0, 53.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/95c40a1a-56cb-4699-9bb5-a0412392cf7e/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[2.0, 10.5], [1.0, 8.5]], "isOverall": false, "label": "BP02_17_Click_Logout/versions/ANDROID", "isController": false}, {"data": [[1.6666666666666667, 9.833333333333334]], "isOverall": false, "label": "BP02_17_Click_Logout/versions/ANDROID-Aggregated", "isController": false}, {"data": [[2.0, 105.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/balance", "isController": false}, {"data": [[2.0, 105.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/balance-Aggregated", "isController": false}, {"data": [[2.0, 48.75]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[2.0, 48.75]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/notifications/customers?type=ANNOUNCEMENT-Aggregated", "isController": false}, {"data": [[2.0, 4700.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/duitnow-inquiry", "isController": false}, {"data": [[2.0, 4700.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/duitnow-inquiry-Aggregated", "isController": false}, {"data": [[2.0, 2703.125]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/enter-passcode", "isController": false}, {"data": [[2.0, 2703.125]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/enter-passcode-Aggregated", "isController": false}, {"data": [[2.0, 20.250000000000004]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/batch", "isController": false}, {"data": [[2.0, 20.250000000000004]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/batch-Aggregated", "isController": false}, {"data": [[2.0, 2825.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/0fdb0840-d198-428a-8a43-2445c10999d2/duitnow-inquiry", "isController": false}, {"data": [[2.0, 2825.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/0fdb0840-d198-428a-8a43-2445c10999d2/duitnow-inquiry-Aggregated", "isController": false}, {"data": [[1.0, 11.5], [2.0, 10.0]], "isOverall": false, "label": "BP01_17_Click_Logout/versions/ANDROID", "isController": false}, {"data": [[1.25, 11.125]], "isOverall": false, "label": "BP01_17_Click_Logout/versions/ANDROID-Aggregated", "isController": false}, {"data": [[1.0, 101.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/balance", "isController": false}, {"data": [[1.0, 101.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/balance-Aggregated", "isController": false}, {"data": [[2.0, 40.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/DUITNOW_OUTWARD", "isController": false}, {"data": [[2.0, 40.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[1.0, 31.666666666666668], [2.0, 20.0]], "isOverall": false, "label": "BP01_17_Click_Logout/logout", "isController": false}, {"data": [[1.25, 28.75]], "isOverall": false, "label": "BP01_17_Click_Logout/logout-Aggregated", "isController": false}, {"data": [[2.0, 1596.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/firebase-token", "isController": false}, {"data": [[2.0, 1596.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/firebase-token-Aggregated", "isController": false}, {"data": [[2.0, 87.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/5b0776eb-364e-4e13-b95b-c400139968c0/balance", "isController": false}, {"data": [[2.0, 87.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/5b0776eb-364e-4e13-b95b-c400139968c0/balance-Aggregated", "isController": false}, {"data": [[2.0, 26.25]], "isOverall": false, "label": "BP02_09_Click_AccountNumber/duitnow/bank", "isController": false}, {"data": [[2.0, 26.25]], "isOverall": false, "label": "BP02_09_Click_AccountNumber/duitnow/bank-Aggregated", "isController": false}, {"data": [[2.0, 23.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/5b0776eb-364e-4e13-b95b-c400139968c0/DUITNOW_OUTWARD", "isController": false}, {"data": [[2.0, 23.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/5b0776eb-364e-4e13-b95b-c400139968c0/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[2.0, 3400.5], [1.0, 5200.5]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/mfa-attempts/7c4f49fd-14db-4396-b415-da4289fb857e", "isController": false}, {"data": [[1.5, 4300.5]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/mfa-attempts/7c4f49fd-14db-4396-b415-da4289fb857e-Aggregated", "isController": false}, {"data": [[2.0, 38.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/DUITNOW_OUTWARD", "isController": false}, {"data": [[2.0, 38.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[2.0, 16.83333333333333]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/batch", "isController": false}, {"data": [[2.0, 16.83333333333333]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/batch-Aggregated", "isController": false}, {"data": [[2.0, 21.0], [1.0, 17.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/batch", "isController": false}, {"data": [[1.6666666666666667, 19.666666666666668]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/batch-Aggregated", "isController": false}, {"data": [[2.0, 23.125]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/batch", "isController": false}, {"data": [[2.0, 23.125]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/batch-Aggregated", "isController": false}, {"data": [[2.0, 18.8], [1.0, 28.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/batch", "isController": false}, {"data": [[1.8333333333333335, 20.333333333333332]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/batch-Aggregated", "isController": false}, {"data": [[1.0, 17.666666666666668], [2.0, 10.0]], "isOverall": false, "label": "BP01_17_Click_Logout/batch", "isController": false}, {"data": [[1.25, 15.75]], "isOverall": false, "label": "BP01_17_Click_Logout/batch-Aggregated", "isController": false}, {"data": [[2.0, 26.125]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/batch", "isController": false}, {"data": [[2.0, 26.125]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/batch-Aggregated", "isController": false}, {"data": [[2.0, 19.2], [1.0, 19.0]], "isOverall": false, "label": "BP01_10_Select_Bank/transfer-types", "isController": false}, {"data": [[1.8333333333333335, 19.166666666666664]], "isOverall": false, "label": "BP01_10_Select_Bank/transfer-types-Aggregated", "isController": false}, {"data": [[1.0, 106.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/balance", "isController": false}, {"data": [[1.0, 106.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/balance-Aggregated", "isController": false}, {"data": [[2.0, 86.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/balance", "isController": false}, {"data": [[2.0, 86.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/balance-Aggregated", "isController": false}, {"data": [[2.0, 22.25]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/batch", "isController": false}, {"data": [[2.0, 22.25]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/batch-Aggregated", "isController": false}, {"data": [[2.0, 90.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/0fdb0840-d198-428a-8a43-2445c10999d2/balance", "isController": false}, {"data": [[2.0, 90.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/0fdb0840-d198-428a-8a43-2445c10999d2/balance-Aggregated", "isController": false}, {"data": [[2.0, 305.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/95c40a1a-56cb-4699-9bb5-a0412392cf7e/balance", "isController": false}, {"data": [[2.0, 305.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/95c40a1a-56cb-4699-9bb5-a0412392cf7e/balance-Aggregated", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/balance", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/balance-Aggregated", "isController": false}, {"data": [[2.0, 329.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/0fdb0840-d198-428a-8a43-2445c10999d2/duitnow-transfer", "isController": false}, {"data": [[2.0, 329.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/0fdb0840-d198-428a-8a43-2445c10999d2/duitnow-transfer-Aggregated", "isController": false}, {"data": [[2.0, 22.666666666666668]], "isOverall": false, "label": "BP02_14_EnterPasscode_Transfer/batch", "isController": false}, {"data": [[2.0, 22.666666666666668]], "isOverall": false, "label": "BP02_14_EnterPasscode_Transfer/batch-Aggregated", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/balance", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/balance-Aggregated", "isController": false}, {"data": [[2.0, 33.0], [1.0, 36.0]], "isOverall": false, "label": "BP01_17_Click_Logout/soft-logout", "isController": false}, {"data": [[1.25, 35.25]], "isOverall": false, "label": "BP01_17_Click_Logout/soft-logout-Aggregated", "isController": false}, {"data": [[2.0, 34.0], [1.0, 47.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa", "isController": false}, {"data": [[1.25, 43.75]], "isOverall": false, "label": "BP01_16_Click_Done/casa-Aggregated", "isController": false}, {"data": [[1.0, 651.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/duitnow-transfer", "isController": false}, {"data": [[1.0, 651.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/duitnow-transfer-Aggregated", "isController": false}, {"data": [[2.0, 71.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/balance", "isController": false}, {"data": [[2.0, 71.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/balance-Aggregated", "isController": false}, {"data": [[2.0, 41.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/5b0776eb-364e-4e13-b95b-c400139968c0/DUITNOW_OUTWARD", "isController": false}, {"data": [[2.0, 41.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/5b0776eb-364e-4e13-b95b-c400139968c0/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[2.0, 25.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/0fdb0840-d198-428a-8a43-2445c10999d2/DUITNOW_OUTWARD", "isController": false}, {"data": [[2.0, 25.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/0fdb0840-d198-428a-8a43-2445c10999d2/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[2.0, 27.5], [1.0, 24.0]], "isOverall": false, "label": "BP02_17_Click_Logout/soft-logout", "isController": false}, {"data": [[1.6666666666666667, 26.333333333333332]], "isOverall": false, "label": "BP02_17_Click_Logout/soft-logout-Aggregated", "isController": false}, {"data": [[2.0, 28.0], [1.0, 116.0]], "isOverall": false, "label": "BP02_16_Click_Done/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[1.6666666666666667, 57.33333333333333]], "isOverall": false, "label": "BP02_16_Click_Done/notifications/customers?type=ANNOUNCEMENT-Aggregated", "isController": false}, {"data": [[2.0, 52.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/a654811b-14b5-43f3-ae34-637d52bbcf6d/DUITNOW_OUTWARD", "isController": false}, {"data": [[2.0, 52.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/a654811b-14b5-43f3-ae34-637d52bbcf6d/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[2.0, 26.333333333333332]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/batch", "isController": false}, {"data": [[2.0, 26.333333333333332]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/batch-Aggregated", "isController": false}, {"data": [[2.0, 138.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/duitnow-transfer", "isController": false}, {"data": [[2.0, 138.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/duitnow-transfer-Aggregated", "isController": false}, {"data": [[1.0, 133.50000000000003], [2.0, 5.5]], "isOverall": false, "label": "BP01_17_Click_Logout/public/status", "isController": false}, {"data": [[1.25, 101.50000000000001]], "isOverall": false, "label": "BP01_17_Click_Logout/public/status-Aggregated", "isController": false}, {"data": [[1.0, 21.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/fa4e9a81-ba70-47ce-8566-ed6696702075/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.0, 21.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/fa4e9a81-ba70-47ce-8566-ed6696702075/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[2.0, 8780.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/95c40a1a-56cb-4699-9bb5-a0412392cf7e/duitnow-inquiry", "isController": false}, {"data": [[2.0, 8780.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/95c40a1a-56cb-4699-9bb5-a0412392cf7e/duitnow-inquiry-Aggregated", "isController": false}, {"data": [[2.0, 108.8], [1.0, 21.0]], "isOverall": false, "label": "BP01_09_Click_AccountNumber/duitnow/bank", "isController": false}, {"data": [[1.8333333333333335, 94.16666666666667]], "isOverall": false, "label": "BP01_09_Click_AccountNumber/duitnow/bank-Aggregated", "isController": false}, {"data": [[2.0, 4100.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/5b0776eb-364e-4e13-b95b-c400139968c0/duitnow-transfer", "isController": false}, {"data": [[2.0, 4100.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/5b0776eb-364e-4e13-b95b-c400139968c0/duitnow-transfer-Aggregated", "isController": false}, {"data": [[2.0, 58.75]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/login", "isController": false}, {"data": [[2.0, 58.75]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/login-Aggregated", "isController": false}, {"data": [[2.0, 9.5]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/versions/ANDROID", "isController": false}, {"data": [[2.0, 9.5]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/versions/ANDROID-Aggregated", "isController": false}, {"data": [[2.0, 44.0], [1.0, 21.0]], "isOverall": false, "label": "BP02_17_Click_Logout/logout", "isController": false}, {"data": [[1.6666666666666667, 36.333333333333336]], "isOverall": false, "label": "BP02_17_Click_Logout/logout-Aggregated", "isController": false}, {"data": [[2.0, 164.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/duitnow-transfer", "isController": false}, {"data": [[2.0, 164.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/duitnow-transfer-Aggregated", "isController": false}, {"data": [[2.0, 56.5]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/casa", "isController": false}, {"data": [[2.0, 56.5]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/casa-Aggregated", "isController": false}, {"data": [[2.0, 2201.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/duitnow-inquiry", "isController": false}, {"data": [[2.0, 2201.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/duitnow-inquiry-Aggregated", "isController": false}, {"data": [[1.0, 4260.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/duitnow-inquiry", "isController": false}, {"data": [[1.0, 4260.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/duitnow-inquiry-Aggregated", "isController": false}, {"data": [[1.0, 22.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/51bf2ddc-5e3c-4d81-b536-044772236f40/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.0, 22.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/51bf2ddc-5e3c-4d81-b536-044772236f40/DUITNOW_OUTWARD-Aggregated", "isController": false}, {"data": [[2.0, 22.4], [1.0, 17.0]], "isOverall": false, "label": "BP01_08_Click_NewTransfer/duitnow-ids", "isController": false}, {"data": [[1.8333333333333335, 21.5]], "isOverall": false, "label": "BP01_08_Click_NewTransfer/duitnow-ids-Aggregated", "isController": false}, {"data": [[1.0, 99.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/balance", "isController": false}, {"data": [[1.0, 99.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/balance-Aggregated", "isController": false}, {"data": [[2.0, 214.66666666666666]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/home/1c47b49d-596b-48bb-8570-60b64b4884a0", "isController": false}, {"data": [[2.0, 214.66666666666666]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/home/1c47b49d-596b-48bb-8570-60b64b4884a0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 2.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 8.766666666666667, "minX": 1.66754484E12, "maxY": 2788.9, "series": [{"data": [[1.66754508E12, 428.6166666666667], [1.6675449E12, 2298.266666666667], [1.66754502E12, 1130.75], [1.66754484E12, 1816.5666666666666], [1.66754514E12, 23.933333333333334], [1.66754496E12, 1812.5333333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66754508E12, 842.1166666666667], [1.6675449E12, 2788.9], [1.66754502E12, 1885.6833333333334], [1.66754484E12, 1985.0333333333333], [1.66754514E12, 8.766666666666667], [1.66754496E12, 2235.05]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66754514E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 4.333333333333333, "minX": 1.66754484E12, "maxY": 8780.0, "series": [{"data": [[1.6675449E12, 25.0], [1.66754502E12, 28.0], [1.66754496E12, 335.5]], "isOverall": false, "label": "BP02_10_Select_Bank/transfer-types", "isController": false}, {"data": [[1.66754502E12, 30.0], [1.66754496E12, 22.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/batch", "isController": false}, {"data": [[1.66754508E12, 13.0], [1.66754502E12, 14.333333333333334]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/batch", "isController": false}, {"data": [[1.6675449E12, 4.333333333333333], [1.66754484E12, 79.5], [1.66754496E12, 13.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/sourceConfig", "isController": false}, {"data": [[1.6675449E12, 17.0], [1.66754484E12, 14.75], [1.66754496E12, 27.0]], "isOverall": false, "label": "BP02_02_Click_Login/batch", "isController": false}, {"data": [[1.6675449E12, 48.0], [1.66754484E12, 195.75], [1.66754496E12, 29.5]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/app-features", "isController": false}, {"data": [[1.66754496E12, 39.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/0fdb0840-d198-428a-8a43-2445c10999d2/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 218.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/duitnow-transfer", "isController": false}, {"data": [[1.66754508E12, 43.0], [1.66754502E12, 44.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa", "isController": false}, {"data": [[1.6675449E12, 277.0], [1.66754484E12, 1033.0], [1.66754496E12, 62.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[1.6675449E12, 7.0], [1.66754484E12, 30.5], [1.66754496E12, 6.5]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/public/status", "isController": false}, {"data": [[1.6675449E12, 44.0], [1.66754484E12, 206.0], [1.66754496E12, 69.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/casa", "isController": false}, {"data": [[1.6675449E12, 125.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/balance", "isController": false}, {"data": [[1.6675449E12, 57.0], [1.66754496E12, 40.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa", "isController": false}, {"data": [[1.66754496E12, 4946.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/121485b5-5c09-45e8-84c7-e999982a0ae3/duitnow-inquiry", "isController": false}, {"data": [[1.66754508E12, 1494.0], [1.66754496E12, 2334.0]], "isOverall": false, "label": "BP02_14_EnterPasscode_Transfer/mfa-attempts", "isController": false}, {"data": [[1.66754502E12, 206.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/duitnow-transfer", "isController": false}, {"data": [[1.6675449E12, 64.66666666666666], [1.66754484E12, 295.0], [1.66754496E12, 30.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/app-features", "isController": false}, {"data": [[1.6675449E12, 24.0], [1.66754484E12, 18.25], [1.66754496E12, 19.0]], "isOverall": false, "label": "BP01_02_Click_Login/batch", "isController": false}, {"data": [[1.6675449E12, 264.3333333333333], [1.66754496E12, 24.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/activities/home/192922c5-9167-4026-ac18-eac2943c4b78", "isController": false}, {"data": [[1.66754496E12, 3826.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/5b0776eb-364e-4e13-b95b-c400139968c0/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 17.5], [1.66754502E12, 17.0], [1.66754496E12, 23.0]], "isOverall": false, "label": "BP02_08_Click_NewTransfer/duitnow-ids", "isController": false}, {"data": [[1.66754508E12, 5.0], [1.66754502E12, 5.5]], "isOverall": false, "label": "BP02_17_Click_Logout/public/status", "isController": false}, {"data": [[1.66754502E12, 2465.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 100.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/5b0776eb-364e-4e13-b95b-c400139968c0/balance", "isController": false}, {"data": [[1.6675449E12, 125.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/balance", "isController": false}, {"data": [[1.6675449E12, 735.6666666666666], [1.66754484E12, 1869.25], [1.66754496E12, 554.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/enter-passcode", "isController": false}, {"data": [[1.6675449E12, 813.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/121485b5-5c09-45e8-84c7-e999982a0ae3/balance", "isController": false}, {"data": [[1.6675449E12, 7.0], [1.66754484E12, 19.75], [1.66754496E12, 6.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/public/status", "isController": false}, {"data": [[1.6675449E12, 6.666666666666667], [1.66754484E12, 222.0], [1.66754496E12, 5.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/versions/ANDROID", "isController": false}, {"data": [[1.66754502E12, 854.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/0fdb0840-d198-428a-8a43-2445c10999d2/balance", "isController": false}, {"data": [[1.66754508E12, 600.5], [1.66754502E12, 28.5]], "isOverall": false, "label": "BP01_16_Click_Done/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[1.6675449E12, 1768.0], [1.66754484E12, 2930.0], [1.66754496E12, 473.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/firebase-token", "isController": false}, {"data": [[1.66754502E12, 23.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/51bf2ddc-5e3c-4d81-b536-044772236f40/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 68.0], [1.66754484E12, 1135.25], [1.66754496E12, 42.5]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/login", "isController": false}, {"data": [[1.66754496E12, 4889.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 5.0], [1.66754484E12, 21.5], [1.66754496E12, 15.5]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/sourceConfig", "isController": false}, {"data": [[1.6675449E12, 73.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/121485b5-5c09-45e8-84c7-e999982a0ae3/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 26.333333333333332], [1.66754484E12, 129.0], [1.66754496E12, 18.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/me", "isController": false}, {"data": [[1.66754508E12, 4030.0], [1.66754502E12, 6299.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/mfa-attempts", "isController": false}, {"data": [[1.66754496E12, 23.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 2307.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/duitnow-inquiry", "isController": false}, {"data": [[1.66754508E12, 21.0], [1.66754502E12, 25.666666666666668]], "isOverall": false, "label": "BP01_14_EnterPasscode_Transfer/batch", "isController": false}, {"data": [[1.66754502E12, 22.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/a654811b-14b5-43f3-ae34-637d52bbcf6d/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 28.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 114.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/balance", "isController": false}, {"data": [[1.66754508E12, 9.0], [1.66754502E12, 15.5]], "isOverall": false, "label": "BP02_17_Click_Logout/batch", "isController": false}, {"data": [[1.66754502E12, 24.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 43.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/fa4e9a81-ba70-47ce-8566-ed6696702075/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 624.0], [1.66754502E12, 860.0]], "isOverall": false, "label": "BP01_14_EnterPasscode_Transfer/mfa-attempts/7c4f49fd-14db-4396-b415-da4289fb857e", "isController": false}, {"data": [[1.6675449E12, 17.5], [1.66754484E12, 820.0], [1.66754496E12, 18.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/me", "isController": false}, {"data": [[1.6675449E12, 60.25], [1.66754496E12, 42.5]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa", "isController": false}, {"data": [[1.6675449E12, 53.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/95c40a1a-56cb-4699-9bb5-a0412392cf7e/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 10.666666666666666], [1.66754502E12, 7.5], [1.66754514E12, 12.0]], "isOverall": false, "label": "BP02_17_Click_Logout/versions/ANDROID", "isController": false}, {"data": [[1.66754496E12, 105.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/balance", "isController": false}, {"data": [[1.6675449E12, 56.0], [1.66754496E12, 27.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[1.66754496E12, 4700.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 790.5], [1.66754484E12, 4751.0], [1.66754496E12, 520.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/enter-passcode", "isController": false}, {"data": [[1.6675449E12, 23.0], [1.66754484E12, 19.25], [1.66754496E12, 14.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/batch", "isController": false}, {"data": [[1.66754496E12, 2825.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/0fdb0840-d198-428a-8a43-2445c10999d2/duitnow-inquiry", "isController": false}, {"data": [[1.66754508E12, 12.4], [1.66754502E12, 5.0], [1.66754514E12, 17.0]], "isOverall": false, "label": "BP01_17_Click_Logout/versions/ANDROID", "isController": false}, {"data": [[1.66754508E12, 101.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/balance", "isController": false}, {"data": [[1.66754496E12, 40.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 37.0], [1.66754502E12, 20.5]], "isOverall": false, "label": "BP01_17_Click_Logout/logout", "isController": false}, {"data": [[1.6675449E12, 895.0], [1.66754484E12, 2445.25], [1.66754496E12, 302.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/firebase-token", "isController": false}, {"data": [[1.66754502E12, 87.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/5b0776eb-364e-4e13-b95b-c400139968c0/balance", "isController": false}, {"data": [[1.6675449E12, 37.0], [1.66754502E12, 19.0], [1.66754496E12, 24.5]], "isOverall": false, "label": "BP02_09_Click_AccountNumber/duitnow/bank", "isController": false}, {"data": [[1.66754502E12, 23.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/5b0776eb-364e-4e13-b95b-c400139968c0/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 4034.0], [1.66754502E12, 4389.333333333333]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/mfa-attempts/7c4f49fd-14db-4396-b415-da4289fb857e", "isController": false}, {"data": [[1.6675449E12, 38.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 14.4], [1.66754484E12, 20.333333333333332], [1.66754496E12, 17.25]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/batch", "isController": false}, {"data": [[1.66754508E12, 17.0], [1.66754502E12, 21.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/batch", "isController": false}, {"data": [[1.6675449E12, 16.333333333333332], [1.66754484E12, 28.5], [1.66754496E12, 22.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/batch", "isController": false}, {"data": [[1.6675449E12, 22.5], [1.66754502E12, 10.0], [1.66754496E12, 22.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/batch", "isController": false}, {"data": [[1.66754508E12, 13.5], [1.66754502E12, 18.0]], "isOverall": false, "label": "BP01_17_Click_Logout/batch", "isController": false}, {"data": [[1.6675449E12, 20.0], [1.66754484E12, 28.75], [1.66754496E12, 27.0]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/batch", "isController": false}, {"data": [[1.6675449E12, 23.5], [1.66754502E12, 15.0], [1.66754496E12, 19.0]], "isOverall": false, "label": "BP01_10_Select_Bank/transfer-types", "isController": false}, {"data": [[1.66754508E12, 106.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/balance", "isController": false}, {"data": [[1.66754496E12, 86.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/balance", "isController": false}, {"data": [[1.6675449E12, 23.0], [1.66754496E12, 21.5]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/batch", "isController": false}, {"data": [[1.6675449E12, 90.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/0fdb0840-d198-428a-8a43-2445c10999d2/balance", "isController": false}, {"data": [[1.6675449E12, 305.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/95c40a1a-56cb-4699-9bb5-a0412392cf7e/balance", "isController": false}, {"data": [[1.66754502E12, 91.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/balance", "isController": false}, {"data": [[1.66754496E12, 329.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/0fdb0840-d198-428a-8a43-2445c10999d2/duitnow-transfer", "isController": false}, {"data": [[1.66754508E12, 19.0], [1.66754496E12, 24.5]], "isOverall": false, "label": "BP02_14_EnterPasscode_Transfer/batch", "isController": false}, {"data": [[1.66754508E12, 86.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/balance", "isController": false}, {"data": [[1.66754508E12, 41.0], [1.66754502E12, 29.5]], "isOverall": false, "label": "BP01_17_Click_Logout/soft-logout", "isController": false}, {"data": [[1.66754508E12, 48.5], [1.66754502E12, 39.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa", "isController": false}, {"data": [[1.66754496E12, 651.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/duitnow-transfer", "isController": false}, {"data": [[1.66754496E12, 71.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/balance", "isController": false}, {"data": [[1.6675449E12, 41.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/5b0776eb-364e-4e13-b95b-c400139968c0/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 25.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/0fdb0840-d198-428a-8a43-2445c10999d2/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 24.0], [1.66754502E12, 27.5]], "isOverall": false, "label": "BP02_17_Click_Logout/soft-logout", "isController": false}, {"data": [[1.66754508E12, 116.0], [1.66754502E12, 28.0]], "isOverall": false, "label": "BP02_16_Click_Done/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[1.6675449E12, 52.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/a654811b-14b5-43f3-ae34-637d52bbcf6d/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 23.0], [1.66754496E12, 28.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/batch", "isController": false}, {"data": [[1.66754496E12, 138.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/duitnow-transfer", "isController": false}, {"data": [[1.66754508E12, 5.5], [1.66754502E12, 197.5]], "isOverall": false, "label": "BP01_17_Click_Logout/public/status", "isController": false}, {"data": [[1.66754502E12, 21.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/fa4e9a81-ba70-47ce-8566-ed6696702075/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754496E12, 8780.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/95c40a1a-56cb-4699-9bb5-a0412392cf7e/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 241.5], [1.66754502E12, 20.5], [1.66754496E12, 20.5]], "isOverall": false, "label": "BP01_09_Click_AccountNumber/duitnow/bank", "isController": false}, {"data": [[1.66754496E12, 4100.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/5b0776eb-364e-4e13-b95b-c400139968c0/duitnow-transfer", "isController": false}, {"data": [[1.6675449E12, 28.0], [1.66754484E12, 90.75], [1.66754496E12, 23.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/login", "isController": false}, {"data": [[1.6675449E12, 12.0], [1.66754484E12, 8.25], [1.66754496E12, 9.5]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/versions/ANDROID", "isController": false}, {"data": [[1.66754508E12, 21.0], [1.66754502E12, 44.0]], "isOverall": false, "label": "BP02_17_Click_Logout/logout", "isController": false}, {"data": [[1.66754502E12, 164.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/duitnow-transfer", "isController": false}, {"data": [[1.6675449E12, 50.0], [1.66754484E12, 61.0], [1.66754496E12, 65.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/casa", "isController": false}, {"data": [[1.66754502E12, 2201.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/duitnow-inquiry", "isController": false}, {"data": [[1.66754496E12, 4260.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/duitnow-inquiry", "isController": false}, {"data": [[1.66754508E12, 22.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/51bf2ddc-5e3c-4d81-b536-044772236f40/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 24.0], [1.66754502E12, 21.5], [1.66754496E12, 19.0]], "isOverall": false, "label": "BP01_08_Click_NewTransfer/duitnow-ids", "isController": false}, {"data": [[1.6675449E12, 99.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/balance", "isController": false}, {"data": [[1.6675449E12, 177.66666666666669], [1.66754484E12, 697.0], [1.66754496E12, 29.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/home/1c47b49d-596b-48bb-8570-60b64b4884a0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66754514E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 4.333333333333333, "minX": 1.66754484E12, "maxY": 8780.0, "series": [{"data": [[1.6675449E12, 25.0], [1.66754502E12, 28.0], [1.66754496E12, 335.5]], "isOverall": false, "label": "BP02_10_Select_Bank/transfer-types", "isController": false}, {"data": [[1.66754502E12, 30.0], [1.66754496E12, 22.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/batch", "isController": false}, {"data": [[1.66754508E12, 13.0], [1.66754502E12, 14.333333333333334]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/batch", "isController": false}, {"data": [[1.6675449E12, 4.333333333333333], [1.66754484E12, 79.5], [1.66754496E12, 13.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/sourceConfig", "isController": false}, {"data": [[1.6675449E12, 17.0], [1.66754484E12, 14.75], [1.66754496E12, 27.0]], "isOverall": false, "label": "BP02_02_Click_Login/batch", "isController": false}, {"data": [[1.6675449E12, 48.0], [1.66754484E12, 195.75], [1.66754496E12, 29.5]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/app-features", "isController": false}, {"data": [[1.66754496E12, 39.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/0fdb0840-d198-428a-8a43-2445c10999d2/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 218.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/duitnow-transfer", "isController": false}, {"data": [[1.66754508E12, 43.0], [1.66754502E12, 44.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa", "isController": false}, {"data": [[1.6675449E12, 277.0], [1.66754484E12, 1033.0], [1.66754496E12, 62.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[1.6675449E12, 7.0], [1.66754484E12, 30.5], [1.66754496E12, 6.5]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/public/status", "isController": false}, {"data": [[1.6675449E12, 44.0], [1.66754484E12, 206.0], [1.66754496E12, 69.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/casa", "isController": false}, {"data": [[1.6675449E12, 125.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/balance", "isController": false}, {"data": [[1.6675449E12, 56.666666666666664], [1.66754496E12, 40.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa", "isController": false}, {"data": [[1.66754496E12, 4946.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/121485b5-5c09-45e8-84c7-e999982a0ae3/duitnow-inquiry", "isController": false}, {"data": [[1.66754508E12, 1493.0], [1.66754496E12, 2313.5]], "isOverall": false, "label": "BP02_14_EnterPasscode_Transfer/mfa-attempts", "isController": false}, {"data": [[1.66754502E12, 206.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/duitnow-transfer", "isController": false}, {"data": [[1.6675449E12, 64.66666666666666], [1.66754484E12, 295.0], [1.66754496E12, 30.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/app-features", "isController": false}, {"data": [[1.6675449E12, 24.0], [1.66754484E12, 18.25], [1.66754496E12, 19.0]], "isOverall": false, "label": "BP01_02_Click_Login/batch", "isController": false}, {"data": [[1.6675449E12, 264.0], [1.66754496E12, 24.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/activities/home/192922c5-9167-4026-ac18-eac2943c4b78", "isController": false}, {"data": [[1.66754496E12, 3826.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/5b0776eb-364e-4e13-b95b-c400139968c0/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 17.5], [1.66754502E12, 17.0], [1.66754496E12, 23.0]], "isOverall": false, "label": "BP02_08_Click_NewTransfer/duitnow-ids", "isController": false}, {"data": [[1.66754508E12, 5.0], [1.66754502E12, 5.5]], "isOverall": false, "label": "BP02_17_Click_Logout/public/status", "isController": false}, {"data": [[1.66754502E12, 2465.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 100.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/5b0776eb-364e-4e13-b95b-c400139968c0/balance", "isController": false}, {"data": [[1.6675449E12, 125.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/balance", "isController": false}, {"data": [[1.6675449E12, 733.3333333333334], [1.66754484E12, 1868.25], [1.66754496E12, 553.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/enter-passcode", "isController": false}, {"data": [[1.6675449E12, 812.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/121485b5-5c09-45e8-84c7-e999982a0ae3/balance", "isController": false}, {"data": [[1.6675449E12, 7.0], [1.66754484E12, 19.75], [1.66754496E12, 6.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/public/status", "isController": false}, {"data": [[1.6675449E12, 6.666666666666667], [1.66754484E12, 222.0], [1.66754496E12, 5.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/versions/ANDROID", "isController": false}, {"data": [[1.66754502E12, 853.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/0fdb0840-d198-428a-8a43-2445c10999d2/balance", "isController": false}, {"data": [[1.66754508E12, 600.0], [1.66754502E12, 28.5]], "isOverall": false, "label": "BP01_16_Click_Done/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[1.6675449E12, 1768.0], [1.66754484E12, 2927.75], [1.66754496E12, 473.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/firebase-token", "isController": false}, {"data": [[1.66754502E12, 23.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/51bf2ddc-5e3c-4d81-b536-044772236f40/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 64.5], [1.66754484E12, 1090.25], [1.66754496E12, 36.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/login", "isController": false}, {"data": [[1.66754496E12, 4889.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 5.0], [1.66754484E12, 21.5], [1.66754496E12, 15.5]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/sourceConfig", "isController": false}, {"data": [[1.6675449E12, 73.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/121485b5-5c09-45e8-84c7-e999982a0ae3/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 24.0], [1.66754484E12, 107.75], [1.66754496E12, 17.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/me", "isController": false}, {"data": [[1.66754508E12, 4030.0], [1.66754502E12, 6299.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/mfa-attempts", "isController": false}, {"data": [[1.66754496E12, 23.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 2307.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/duitnow-inquiry", "isController": false}, {"data": [[1.66754508E12, 21.0], [1.66754502E12, 25.666666666666668]], "isOverall": false, "label": "BP01_14_EnterPasscode_Transfer/batch", "isController": false}, {"data": [[1.66754502E12, 21.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/a654811b-14b5-43f3-ae34-637d52bbcf6d/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 28.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 114.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/balance", "isController": false}, {"data": [[1.66754508E12, 9.0], [1.66754502E12, 15.5]], "isOverall": false, "label": "BP02_17_Click_Logout/batch", "isController": false}, {"data": [[1.66754502E12, 24.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 42.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/fa4e9a81-ba70-47ce-8566-ed6696702075/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 623.0], [1.66754502E12, 827.6666666666666]], "isOverall": false, "label": "BP01_14_EnterPasscode_Transfer/mfa-attempts/7c4f49fd-14db-4396-b415-da4289fb857e", "isController": false}, {"data": [[1.6675449E12, 16.5], [1.66754484E12, 816.0], [1.66754496E12, 17.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/me", "isController": false}, {"data": [[1.6675449E12, 60.25], [1.66754496E12, 42.5]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa", "isController": false}, {"data": [[1.6675449E12, 53.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/95c40a1a-56cb-4699-9bb5-a0412392cf7e/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 10.666666666666666], [1.66754502E12, 7.5], [1.66754514E12, 12.0]], "isOverall": false, "label": "BP02_17_Click_Logout/versions/ANDROID", "isController": false}, {"data": [[1.66754496E12, 105.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/balance", "isController": false}, {"data": [[1.6675449E12, 56.0], [1.66754496E12, 27.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[1.66754496E12, 4700.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 789.0], [1.66754484E12, 4748.5], [1.66754496E12, 485.5]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/enter-passcode", "isController": false}, {"data": [[1.6675449E12, 23.0], [1.66754484E12, 19.25], [1.66754496E12, 14.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/batch", "isController": false}, {"data": [[1.66754496E12, 2825.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/0fdb0840-d198-428a-8a43-2445c10999d2/duitnow-inquiry", "isController": false}, {"data": [[1.66754508E12, 12.4], [1.66754502E12, 5.0], [1.66754514E12, 17.0]], "isOverall": false, "label": "BP01_17_Click_Logout/versions/ANDROID", "isController": false}, {"data": [[1.66754508E12, 101.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/balance", "isController": false}, {"data": [[1.66754496E12, 40.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 37.0], [1.66754502E12, 20.5]], "isOverall": false, "label": "BP01_17_Click_Logout/logout", "isController": false}, {"data": [[1.6675449E12, 894.6666666666666], [1.66754484E12, 2424.25], [1.66754496E12, 302.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/firebase-token", "isController": false}, {"data": [[1.66754502E12, 87.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/5b0776eb-364e-4e13-b95b-c400139968c0/balance", "isController": false}, {"data": [[1.6675449E12, 37.0], [1.66754502E12, 19.0], [1.66754496E12, 24.0]], "isOverall": false, "label": "BP02_09_Click_AccountNumber/duitnow/bank", "isController": false}, {"data": [[1.66754502E12, 22.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/5b0776eb-364e-4e13-b95b-c400139968c0/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 4033.0], [1.66754502E12, 4388.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/mfa-attempts/7c4f49fd-14db-4396-b415-da4289fb857e", "isController": false}, {"data": [[1.6675449E12, 38.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 14.4], [1.66754484E12, 20.333333333333332], [1.66754496E12, 17.25]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/batch", "isController": false}, {"data": [[1.66754508E12, 17.0], [1.66754502E12, 21.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/batch", "isController": false}, {"data": [[1.6675449E12, 16.333333333333332], [1.66754484E12, 28.5], [1.66754496E12, 22.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/batch", "isController": false}, {"data": [[1.6675449E12, 22.5], [1.66754502E12, 10.0], [1.66754496E12, 22.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/batch", "isController": false}, {"data": [[1.66754508E12, 13.5], [1.66754502E12, 18.0]], "isOverall": false, "label": "BP01_17_Click_Logout/batch", "isController": false}, {"data": [[1.6675449E12, 20.0], [1.66754484E12, 28.75], [1.66754496E12, 27.0]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/batch", "isController": false}, {"data": [[1.6675449E12, 23.5], [1.66754502E12, 15.0], [1.66754496E12, 18.5]], "isOverall": false, "label": "BP01_10_Select_Bank/transfer-types", "isController": false}, {"data": [[1.66754508E12, 106.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/balance", "isController": false}, {"data": [[1.66754496E12, 86.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/balance", "isController": false}, {"data": [[1.6675449E12, 23.0], [1.66754496E12, 21.5]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/batch", "isController": false}, {"data": [[1.6675449E12, 90.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/0fdb0840-d198-428a-8a43-2445c10999d2/balance", "isController": false}, {"data": [[1.6675449E12, 305.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/95c40a1a-56cb-4699-9bb5-a0412392cf7e/balance", "isController": false}, {"data": [[1.66754502E12, 91.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/balance", "isController": false}, {"data": [[1.66754496E12, 328.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/0fdb0840-d198-428a-8a43-2445c10999d2/duitnow-transfer", "isController": false}, {"data": [[1.66754508E12, 19.0], [1.66754496E12, 24.5]], "isOverall": false, "label": "BP02_14_EnterPasscode_Transfer/batch", "isController": false}, {"data": [[1.66754508E12, 85.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/balance", "isController": false}, {"data": [[1.66754508E12, 41.0], [1.66754502E12, 29.5]], "isOverall": false, "label": "BP01_17_Click_Logout/soft-logout", "isController": false}, {"data": [[1.66754508E12, 48.5], [1.66754502E12, 39.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa", "isController": false}, {"data": [[1.66754496E12, 650.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/duitnow-transfer", "isController": false}, {"data": [[1.66754496E12, 71.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/balance", "isController": false}, {"data": [[1.6675449E12, 41.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/5b0776eb-364e-4e13-b95b-c400139968c0/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 24.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/0fdb0840-d198-428a-8a43-2445c10999d2/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 24.0], [1.66754502E12, 27.5]], "isOverall": false, "label": "BP02_17_Click_Logout/soft-logout", "isController": false}, {"data": [[1.66754508E12, 114.0], [1.66754502E12, 28.0]], "isOverall": false, "label": "BP02_16_Click_Done/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[1.6675449E12, 52.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/a654811b-14b5-43f3-ae34-637d52bbcf6d/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 23.0], [1.66754496E12, 28.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/batch", "isController": false}, {"data": [[1.66754496E12, 138.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/duitnow-transfer", "isController": false}, {"data": [[1.66754508E12, 5.5], [1.66754502E12, 197.5]], "isOverall": false, "label": "BP01_17_Click_Logout/public/status", "isController": false}, {"data": [[1.66754502E12, 21.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/fa4e9a81-ba70-47ce-8566-ed6696702075/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754496E12, 8780.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/95c40a1a-56cb-4699-9bb5-a0412392cf7e/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 241.5], [1.66754502E12, 20.5], [1.66754496E12, 20.5]], "isOverall": false, "label": "BP01_09_Click_AccountNumber/duitnow/bank", "isController": false}, {"data": [[1.66754496E12, 4100.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/5b0776eb-364e-4e13-b95b-c400139968c0/duitnow-transfer", "isController": false}, {"data": [[1.6675449E12, 27.0], [1.66754484E12, 89.75], [1.66754496E12, 22.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/login", "isController": false}, {"data": [[1.6675449E12, 11.5], [1.66754484E12, 8.25], [1.66754496E12, 9.5]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/versions/ANDROID", "isController": false}, {"data": [[1.66754508E12, 21.0], [1.66754502E12, 44.0]], "isOverall": false, "label": "BP02_17_Click_Logout/logout", "isController": false}, {"data": [[1.66754502E12, 164.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/duitnow-transfer", "isController": false}, {"data": [[1.6675449E12, 50.0], [1.66754484E12, 61.0], [1.66754496E12, 65.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/casa", "isController": false}, {"data": [[1.66754502E12, 2201.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/duitnow-inquiry", "isController": false}, {"data": [[1.66754496E12, 4260.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/duitnow-inquiry", "isController": false}, {"data": [[1.66754508E12, 22.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/51bf2ddc-5e3c-4d81-b536-044772236f40/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 23.5], [1.66754502E12, 21.5], [1.66754496E12, 19.0]], "isOverall": false, "label": "BP01_08_Click_NewTransfer/duitnow-ids", "isController": false}, {"data": [[1.6675449E12, 99.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/balance", "isController": false}, {"data": [[1.6675449E12, 177.66666666666669], [1.66754484E12, 697.0], [1.66754496E12, 29.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/home/1c47b49d-596b-48bb-8570-60b64b4884a0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66754514E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66754484E12, "maxY": 17.25, "series": [{"data": [[1.6675449E12, 0.0], [1.66754502E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_10_Select_Bank/transfer-types", "isController": false}, {"data": [[1.66754502E12, 9.0], [1.66754496E12, 4.5]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/batch", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/batch", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 17.25], [1.66754496E12, 9.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/sourceConfig", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_02_Click_Login/batch", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/app-features", "isController": false}, {"data": [[1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/0fdb0840-d198-428a-8a43-2445c10999d2/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 9.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/duitnow-transfer", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 9.75], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/public/status", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/casa", "isController": false}, {"data": [[1.6675449E12, 0.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/balance", "isController": false}, {"data": [[1.6675449E12, 4.333333333333333], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa", "isController": false}, {"data": [[1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/121485b5-5c09-45e8-84c7-e999982a0ae3/duitnow-inquiry", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_14_EnterPasscode_Transfer/mfa-attempts", "isController": false}, {"data": [[1.66754502E12, 9.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/duitnow-transfer", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/app-features", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_02_Click_Login/batch", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/activities/home/192922c5-9167-4026-ac18-eac2943c4b78", "isController": false}, {"data": [[1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/5b0776eb-364e-4e13-b95b-c400139968c0/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754502E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_08_Click_NewTransfer/duitnow-ids", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP02_17_Click_Logout/public/status", "isController": false}, {"data": [[1.66754502E12, 0.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 0.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/5b0776eb-364e-4e13-b95b-c400139968c0/balance", "isController": false}, {"data": [[1.6675449E12, 0.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/balance", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/enter-passcode", "isController": false}, {"data": [[1.6675449E12, 0.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/121485b5-5c09-45e8-84c7-e999982a0ae3/balance", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 10.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/public/status", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/versions/ANDROID", "isController": false}, {"data": [[1.66754502E12, 0.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/0fdb0840-d198-428a-8a43-2445c10999d2/balance", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_16_Click_Done/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/firebase-token", "isController": false}, {"data": [[1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/51bf2ddc-5e3c-4d81-b536-044772236f40/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 12.5]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/login", "isController": false}, {"data": [[1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 17.0], [1.66754496E12, 10.0]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/sourceConfig", "isController": false}, {"data": [[1.6675449E12, 0.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/121485b5-5c09-45e8-84c7-e999982a0ae3/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 3.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/me", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/mfa-attempts", "isController": false}, {"data": [[1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/duitnow-inquiry", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 7.0]], "isOverall": false, "label": "BP01_14_EnterPasscode_Transfer/batch", "isController": false}, {"data": [[1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/a654811b-14b5-43f3-ae34-637d52bbcf6d/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 0.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/balance", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP02_17_Click_Logout/batch", "isController": false}, {"data": [[1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 0.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/fa4e9a81-ba70-47ce-8566-ed6696702075/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_14_EnterPasscode_Transfer/mfa-attempts/7c4f49fd-14db-4396-b415-da4289fb857e", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/me", "isController": false}, {"data": [[1.6675449E12, 4.75], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa", "isController": false}, {"data": [[1.6675449E12, 0.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/95c40a1a-56cb-4699-9bb5-a0412392cf7e/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 5.333333333333334], [1.66754502E12, 0.0], [1.66754514E12, 7.0]], "isOverall": false, "label": "BP02_17_Click_Logout/versions/ANDROID", "isController": false}, {"data": [[1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/balance", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/enter-passcode", "isController": false}, {"data": [[1.6675449E12, 2.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/batch", "isController": false}, {"data": [[1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_12_Click_Next/casa/0fdb0840-d198-428a-8a43-2445c10999d2/duitnow-inquiry", "isController": false}, {"data": [[1.66754508E12, 5.8], [1.66754502E12, 0.0], [1.66754514E12, 10.0]], "isOverall": false, "label": "BP01_17_Click_Logout/versions/ANDROID", "isController": false}, {"data": [[1.66754508E12, 0.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/balance", "isController": false}, {"data": [[1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_17_Click_Logout/logout", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/firebase-token", "isController": false}, {"data": [[1.66754502E12, 0.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/5b0776eb-364e-4e13-b95b-c400139968c0/balance", "isController": false}, {"data": [[1.6675449E12, 9.0], [1.66754502E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_09_Click_AccountNumber/duitnow/bank", "isController": false}, {"data": [[1.66754502E12, 0.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/5b0776eb-364e-4e13-b95b-c400139968c0/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/mfa-attempts/7c4f49fd-14db-4396-b415-da4289fb857e", "isController": false}, {"data": [[1.6675449E12, 0.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/batch", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/batch", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 12.0], [1.66754496E12, 9.0]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/batch", "isController": false}, {"data": [[1.6675449E12, 6.0], [1.66754502E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/batch", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_17_Click_Logout/batch", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 12.0], [1.66754496E12, 9.0]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/batch", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754502E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_10_Select_Bank/transfer-types", "isController": false}, {"data": [[1.66754508E12, 0.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/balance", "isController": false}, {"data": [[1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/balance", "isController": false}, {"data": [[1.6675449E12, 5.5], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/batch", "isController": false}, {"data": [[1.6675449E12, 0.0]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/0fdb0840-d198-428a-8a43-2445c10999d2/balance", "isController": false}, {"data": [[1.6675449E12, 0.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/95c40a1a-56cb-4699-9bb5-a0412392cf7e/balance", "isController": false}, {"data": [[1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/balance", "isController": false}, {"data": [[1.66754496E12, 8.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/0fdb0840-d198-428a-8a43-2445c10999d2/duitnow-transfer", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754496E12, 4.5]], "isOverall": false, "label": "BP02_14_EnterPasscode_Transfer/batch", "isController": false}, {"data": [[1.66754508E12, 0.0]], "isOverall": false, "label": "BP02_16_Click_Done/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/balance", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_17_Click_Logout/soft-logout", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_16_Click_Done/casa", "isController": false}, {"data": [[1.66754496E12, 7.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/duitnow-transfer", "isController": false}, {"data": [[1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/balance", "isController": false}, {"data": [[1.6675449E12, 0.0]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/5b0776eb-364e-4e13-b95b-c400139968c0/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 0.0]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/0fdb0840-d198-428a-8a43-2445c10999d2/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP02_17_Click_Logout/soft-logout", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP02_16_Click_Done/notifications/customers?type=ANNOUNCEMENT", "isController": false}, {"data": [[1.6675449E12, 0.0]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/a654811b-14b5-43f3-ae34-637d52bbcf6d/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754502E12, 9.0], [1.66754496E12, 4.5]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/batch", "isController": false}, {"data": [[1.66754496E12, 10.0]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/duitnow-transfer", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_17_Click_Logout/public/status", "isController": false}, {"data": [[1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/fa4e9a81-ba70-47ce-8566-ed6696702075/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/95c40a1a-56cb-4699-9bb5-a0412392cf7e/duitnow-inquiry", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754502E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_09_Click_AccountNumber/duitnow/bank", "isController": false}, {"data": [[1.66754496E12, 10.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/5b0776eb-364e-4e13-b95b-c400139968c0/duitnow-transfer", "isController": false}, {"data": [[1.6675449E12, 3.3333333333333335], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/login", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/versions/ANDROID", "isController": false}, {"data": [[1.66754508E12, 0.0], [1.66754502E12, 0.0]], "isOverall": false, "label": "BP02_17_Click_Logout/logout", "isController": false}, {"data": [[1.66754502E12, 8.0]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/duitnow-transfer", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 8.0]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/casa", "isController": false}, {"data": [[1.66754502E12, 0.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/duitnow-inquiry", "isController": false}, {"data": [[1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_12_Click_Next/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/duitnow-inquiry", "isController": false}, {"data": [[1.66754508E12, 0.0]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/51bf2ddc-5e3c-4d81-b536-044772236f40/DUITNOW_OUTWARD", "isController": false}, {"data": [[1.6675449E12, 8.0], [1.66754502E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_08_Click_NewTransfer/duitnow-ids", "isController": false}, {"data": [[1.6675449E12, 0.0]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/balance", "isController": false}, {"data": [[1.6675449E12, 0.0], [1.66754484E12, 0.0], [1.66754496E12, 0.0]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/home/1c47b49d-596b-48bb-8570-60b64b4884a0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66754514E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 3.0, "minX": 1.66754484E12, "maxY": 7425.0, "series": [{"data": [[1.66754508E12, 4034.0], [1.6675449E12, 1922.0], [1.66754502E12, 7053.0], [1.66754484E12, 7425.0], [1.66754514E12, 17.0], [1.66754496E12, 4700.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66754508E12, 1004.8000000000015], [1.6675449E12, 473.20000000000005], [1.66754502E12, 2222.2000000000003], [1.66754484E12, 2006.6000000000013], [1.66754514E12, 17.0], [1.66754496E12, 651.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66754508E12, 4034.0], [1.6675449E12, 1881.9600000000014], [1.66754502E12, 7053.0], [1.66754484E12, 7425.0], [1.66754514E12, 17.0], [1.66754496E12, 4700.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66754508E12, 3649.6000000000035], [1.6675449E12, 781.7999999999997], [1.66754502E12, 3696.3999999999883], [1.66754484E12, 3596.5999999999995], [1.66754514E12, 17.0], [1.66754496E12, 3575.75]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66754508E12, 4.0], [1.6675449E12, 3.0], [1.66754502E12, 4.0], [1.66754484E12, 4.0], [1.66754514E12, 12.0], [1.66754496E12, 5.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66754508E12, 21.0], [1.6675449E12, 29.0], [1.66754502E12, 25.0], [1.66754484E12, 31.0], [1.66754514E12, 14.5], [1.66754496E12, 26.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66754514E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 14.5, "minX": 1.0, "maxY": 8780.0, "series": [{"data": [[4.0, 14.5], [1.0, 20.0], [2.0, 38.5], [8.0, 65.0], [9.0, 30.0], [5.0, 24.0], [10.0, 29.5], [3.0, 32.5], [12.0, 17.5], [6.0, 27.0], [13.0, 30.5], [7.0, 31.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 2922.0], [2.0, 4917.5], [1.0, 8780.0], [9.0, 2670.0], [13.0, 2034.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 13.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 14.5, "minX": 1.0, "maxY": 8780.0, "series": [{"data": [[4.0, 14.5], [1.0, 20.0], [2.0, 38.5], [8.0, 58.0], [9.0, 30.0], [5.0, 23.0], [10.0, 29.5], [3.0, 32.5], [12.0, 17.5], [6.0, 27.0], [13.0, 30.5], [7.0, 31.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 2845.0], [2.0, 4917.5], [1.0, 8780.0], [9.0, 2665.5], [13.0, 2033.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 13.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.66754484E12, "maxY": 1.8666666666666667, "series": [{"data": [[1.66754508E12, 0.7], [1.6675449E12, 1.8666666666666667], [1.66754502E12, 1.2833333333333334], [1.66754484E12, 1.5666666666666667], [1.66754514E12, 0.03333333333333333], [1.66754496E12, 1.4333333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66754514E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66754484E12, "maxY": 1.8666666666666667, "series": [{"data": [[1.66754508E12, 0.7], [1.6675449E12, 1.8666666666666667], [1.66754502E12, 1.2833333333333334], [1.66754484E12, 1.45], [1.66754514E12, 0.03333333333333333], [1.66754496E12, 1.4]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666], [1.66754484E12, 0.08333333333333333], [1.66754496E12, 0.05]], "isOverall": false, "label": "400", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66754514E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66754484E12, "maxY": 0.1, "series": [{"data": [[1.6675449E12, 0.05], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/batch-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_16_Click_Done/casa/0fdb0840-d198-428a-8a43-2445c10999d2/balance-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/balance-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP02_14_EnterPasscode_Transfer/mfa-attempts-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/balance-success", "isController": false}, {"data": [[1.6675449E12, 0.05], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/sourceConfig-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/me-success", "isController": false}, {"data": [[1.6675449E12, 0.05], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/versions/ANDROID-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_12_Click_Next/casa/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/duitnow-inquiry-failure", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_16_Click_Done/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/balance-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_16_Click_Done/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/balance-success", "isController": false}, {"data": [[1.6675449E12, 0.05], [1.66754484E12, 0.016666666666666666], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/home/1c47b49d-596b-48bb-8570-60b64b4884a0-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/95c40a1a-56cb-4699-9bb5-a0412392cf7e/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/duitnow-transfer-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/0fdb0840-d198-428a-8a43-2445c10999d2/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/5b0776eb-364e-4e13-b95b-c400139968c0/duitnow-transfer-success", "isController": false}, {"data": [[1.6675449E12, 0.05], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_01_Launch_BeU_App/public/status-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/0fdb0840-d198-428a-8a43-2445c10999d2/duitnow-transfer-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666], [1.66754502E12, 0.03333333333333333]], "isOverall": false, "label": "BP02_17_Click_Logout/logout-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_12_Click_Next/casa/95c40a1a-56cb-4699-9bb5-a0412392cf7e/duitnow-inquiry-failure", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/login-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/balance-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666], [1.66754502E12, 0.03333333333333333]], "isOverall": false, "label": "BP02_17_Click_Logout/batch-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/a654811b-14b5-43f3-ae34-637d52bbcf6d/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.66754508E12, 0.06666666666666667], [1.66754502E12, 0.06666666666666667]], "isOverall": false, "label": "BP01_17_Click_Logout/public/status-success", "isController": false}, {"data": [[1.6675449E12, 0.05], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/app-features-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/fa4e9a81-ba70-47ce-8566-ed6696702075/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/51bf2ddc-5e3c-4d81-b536-044772236f40/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.6675449E12, 0.1], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/batch-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_12_Click_Next/casa/5b0776eb-364e-4e13-b95b-c400139968c0/duitnow-inquiry-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666], [1.66754502E12, 0.03333333333333333]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/batch-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754502E12, 0.03333333333333333], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_08_Click_NewTransfer/duitnow-ids-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP02_14_EnterPasscode_Transfer/batch-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/0fdb0840-d198-428a-8a43-2445c10999d2/balance-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_16_Click_Done/casa/5b0776eb-364e-4e13-b95b-c400139968c0/balance-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_12_Click_Next/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/duitnow-inquiry-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666], [1.66754502E12, 0.03333333333333333]], "isOverall": false, "label": "BP02_16_Click_Done/casa-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/app-features-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/duitnow-transfer-success", "isController": false}, {"data": [[1.66754484E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/firebase-token-failure", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/enter-passcode-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754502E12, 0.03333333333333333], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_10_Select_Bank/transfer-types-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/5b0776eb-364e-4e13-b95b-c400139968c0/balance-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754484E12, 0.03333333333333333], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/firebase-token-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_12_Click_Next/casa/a654811b-14b5-43f3-ae34-637d52bbcf6d/duitnow-inquiry-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/duitnow-transfer-success", "isController": false}, {"data": [[1.66754508E12, 0.03333333333333333], [1.66754502E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_17_Click_Logout/batch-success", "isController": false}, {"data": [[1.6675449E12, 0.06666666666666667], [1.66754502E12, 0.016666666666666666], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/batch-success", "isController": false}, {"data": [[1.6675449E12, 0.08333333333333333], [1.66754484E12, 0.05], [1.66754496E12, 0.06666666666666667]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/batch-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/121485b5-5c09-45e8-84c7-e999982a0ae3/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/95c40a1a-56cb-4699-9bb5-a0412392cf7e/balance-success", "isController": false}, {"data": [[1.6675449E12, 0.05], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/notifications/customers?type=ANNOUNCEMENT-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666], [1.66754502E12, 0.05]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/mfa-attempts/7c4f49fd-14db-4396-b415-da4289fb857e-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_12_Click_Next/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/duitnow-inquiry-success", "isController": false}, {"data": [[1.6675449E12, 0.05], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/me-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_16_Click_Done/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/balance-success", "isController": false}, {"data": [[1.66754508E12, 0.03333333333333333], [1.66754502E12, 0.06666666666666667]], "isOverall": false, "label": "BP02_17_Click_Logout/public/status-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666], [1.66754502E12, 0.016666666666666666], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP02_09_Click_AccountNumber/duitnow/bank-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_12_Click_Next/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/duitnow-inquiry-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/versions/ANDROID-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/fa4e9a81-ba70-47ce-8566-ed6696702075/duitnow-transfer-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/5b0776eb-364e-4e13-b95b-c400139968c0/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/121485b5-5c09-45e8-84c7-e999982a0ae3/balance-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_16_Click_Done/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/balance-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666], [1.66754502E12, 0.05]], "isOverall": false, "label": "BP01_14_EnterPasscode_Transfer/mfa-attempts/7c4f49fd-14db-4396-b415-da4289fb857e-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/balance-success", "isController": false}, {"data": [[1.66754502E12, 0.03333333333333333], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/batch-success", "isController": false}, {"data": [[1.66754508E12, 0.03333333333333333], [1.66754502E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_16_Click_Done/notifications/customers?type=ANNOUNCEMENT-success", "isController": false}, {"data": [[1.66754508E12, 0.03333333333333333], [1.66754502E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_17_Click_Logout/logout-success", "isController": false}, {"data": [[1.66754508E12, 0.08333333333333333], [1.66754502E12, 0.03333333333333333], [1.66754514E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_17_Click_Logout/versions/ANDROID-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754484E12, 0.03333333333333333], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/casa-success", "isController": false}, {"data": [[1.6675449E12, 0.05], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa-success", "isController": false}, {"data": [[1.6675449E12, 0.06666666666666667], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754502E12, 0.03333333333333333], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_09_Click_AccountNumber/duitnow/bank-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.6675449E12, 0.05], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/login-success", "isController": false}, {"data": [[1.6675449E12, 0.05], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/enter-passcode-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666], [1.66754502E12, 0.05]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/batch-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666], [1.66754484E12, 0.05]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/firebase-token-failure", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754484E12, 0.016666666666666666], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/firebase-token-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666], [1.66754502E12, 0.016666666666666666], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP02_10_Select_Bank/transfer-types-success", "isController": false}, {"data": [[1.66754508E12, 0.03333333333333333], [1.66754502E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_17_Click_Logout/soft-logout-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/fa4e9a81-ba70-47ce-8566-ed6696702075/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/51bf2ddc-5e3c-4d81-b536-044772236f40/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.66754508E12, 0.03333333333333333], [1.66754502E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_16_Click_Done/casa-success", "isController": false}, {"data": [[1.6675449E12, 0.05], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_02_Click_Login/batch-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666], [1.66754502E12, 0.03333333333333333]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/mfa-attempts-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_12_Click_Next/casa/121485b5-5c09-45e8-84c7-e999982a0ae3/duitnow-inquiry-failure", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_15_EnterOTP_Transfer/favourites/a654811b-14b5-43f3-ae34-637d52bbcf6d/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/0fdb0840-d198-428a-8a43-2445c10999d2/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_15_EnterOTP_Transfer/favourites/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_13_SwipeDown_Transfer/casa/51bf2ddc-5e3c-4d81-b536-044772236f40/duitnow-transfer-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666], [1.66754502E12, 0.03333333333333333]], "isOverall": false, "label": "BP02_17_Click_Logout/soft-logout-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_05_Click_Pocket/casa/bc6d5a6a-9fcd-4306-94fa-f485ff8a3d7f/balance-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/public/status-success", "isController": false}, {"data": [[1.66754508E12, 0.05], [1.66754502E12, 0.03333333333333333], [1.66754514E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_17_Click_Logout/versions/ANDROID-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_05_Click_Pocket/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/balance-success", "isController": false}, {"data": [[1.6675449E12, 0.05], [1.66754484E12, 0.016666666666666666], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_03_EnterPasscode_Login/notifications/customers?type=ANNOUNCEMENT-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/sourceConfig-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666], [1.66754502E12, 0.03333333333333333]], "isOverall": false, "label": "BP02_16_Click_Done/notifications/customers?type=ANNOUNCEMENT-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/batch-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_07_Click_TransfertoOthers/favourites/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_01_Launch_BeU_App/batch-success", "isController": false}, {"data": [[1.6675449E12, 0.05], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/activities/home/192922c5-9167-4026-ac18-eac2943c4b78-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666], [1.66754502E12, 0.05]], "isOverall": false, "label": "BP01_14_EnterPasscode_Transfer/batch-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_07_Click_TransfertoOthers/favourites/5b0776eb-364e-4e13-b95b-c400139968c0/DUITNOW_OUTWARD-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP02_13_SwipeDown_Transfer/batch-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754484E12, 0.06666666666666667], [1.66754496E12, 0.03333333333333333]], "isOverall": false, "label": "BP01_02_Click_Login/batch-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754484E12, 0.016666666666666666], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_03_EnterPasscode_Login/casa-success", "isController": false}, {"data": [[1.6675449E12, 0.03333333333333333], [1.66754502E12, 0.016666666666666666], [1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_08_Click_NewTransfer/duitnow-ids-success", "isController": false}, {"data": [[1.66754496E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_12_Click_Next/casa/0fdb0840-d198-428a-8a43-2445c10999d2/duitnow-inquiry-success", "isController": false}, {"data": [[1.66754502E12, 0.016666666666666666]], "isOverall": false, "label": "BP02_12_Click_Next/casa/0b60bbf8-fb6d-4454-9243-2ad4395fc6a8/duitnow-inquiry-success", "isController": false}, {"data": [[1.66754508E12, 0.016666666666666666]], "isOverall": false, "label": "BP01_16_Click_Done/casa/4440cbb0-57be-4a1e-b115-08ccbae7a9e1/balance-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66754514E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66754484E12, "maxY": 1.8666666666666667, "series": [{"data": [[1.66754508E12, 0.7], [1.6675449E12, 1.8666666666666667], [1.66754502E12, 1.2833333333333334], [1.66754484E12, 1.45], [1.66754514E12, 0.03333333333333333], [1.66754496E12, 1.4]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.6675449E12, 0.016666666666666666], [1.66754484E12, 0.08333333333333333], [1.66754496E12, 0.05]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66754514E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
