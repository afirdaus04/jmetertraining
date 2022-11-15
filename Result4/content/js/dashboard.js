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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.730544747081712, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.4, 500, 1500, "/catalog/fetchImage-33"], "isController": false}, {"data": [0.4666666666666667, 500, 1500, "Click Pay Now/order/api/v1/orders/users/800075438-130"], "isController": false}, {"data": [0.6176470588235294, 500, 1500, "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "Click Checkout/order/api/v1/carts/800075438-119"], "isController": false}, {"data": [0.23333333333333334, 500, 1500, "Click Item/css/images/category_banner_4.png-94"], "isController": false}, {"data": [0.7941176470588235, 500, 1500, "Launch/css/images/linkedin.png-80"], "isController": false}, {"data": [0.6333333333333333, 500, 1500, "Click Cart/order/api/v1/carts/800075438-113"], "isController": false}, {"data": [0.5, 500, 1500, "Choose Item/catalog/api/v1/categories/4/products-105"], "isController": false}, {"data": [1.0, 500, 1500, "Choose Item/css/images/review_Left_disabled.png-110"], "isController": false}, {"data": [0.6578947368421053, 500, 1500, "/catalog/fetchImage-36"], "isController": false}, {"data": [0.6, 500, 1500, "/catalog/fetchImage-37"], "isController": false}, {"data": [0.8529411764705882, 500, 1500, "Launch/css/images/closeDark.png-57"], "isController": false}, {"data": [0.35, 500, 1500, "/catalog/fetchImage-34"], "isController": false}, {"data": [0.8529411764705882, 500, 1500, "Launch/css/images/logo.png-56"], "isController": false}, {"data": [0.39473684210526316, 500, 1500, "/catalog/fetchImage-35"], "isController": false}, {"data": [0.7352941176470589, 500, 1500, "Launch/catalog/api/v1/deals/search-62"], "isController": false}, {"data": [0.8235294117647058, 500, 1500, "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74"], "isController": false}, {"data": [1.0, 500, 1500, "Click Cart/app/views/shoppingCart.html-114"], "isController": false}, {"data": [0.7352941176470589, 500, 1500, "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50"], "isController": false}, {"data": [0.8823529411764706, 500, 1500, "Launch/accountservice/ws/GetAccountConfigurationRequest-59"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "Click Checkout/accountservice/ws/GetAccountByIdRequest-117"], "isController": false}, {"data": [0.9117647058823529, 500, 1500, "Launch/app/views/home-page.html-65"], "isController": false}, {"data": [0.9705882352941176, 500, 1500, "Launch/css/images/chat_logo.png-76"], "isController": false}, {"data": [0.9117647058823529, 500, 1500, "Launch/css/images/facebook.png-78"], "isController": false}, {"data": [0.8529411764705882, 500, 1500, "Launch/css/images/twitter.png-79"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "Choose Item/css/images/reviewUser.png-109"], "isController": false}, {"data": [0.9, 500, 1500, "Click Cart/css/images/Master_credit.png-115"], "isController": false}, {"data": [0.7647058823529411, 500, 1500, "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55"], "isController": false}, {"data": [0.8823529411764706, 500, 1500, "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73"], "isController": false}, {"data": [0.9, 500, 1500, "Click Item/catalog/fetchImage-100"], "isController": false}, {"data": [0.5, 500, 1500, "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112"], "isController": false}, {"data": [0.3611111111111111, 500, 1500, "Launch/vendor/requirejs/require.js-43"], "isController": false}, {"data": [1.0, 500, 1500, "Click Profile/treatment/get-139"], "isController": false}, {"data": [0.4666666666666667, 500, 1500, "Click Profile/treatment/get-138"], "isController": false}, {"data": [0.7058823529411765, 500, 1500, "Launch/services.properties-52"], "isController": false}, {"data": [0.5, 500, 1500, "Login/css/images/FacebookLogo.png-87"], "isController": false}, {"data": [0.7352941176470589, 500, 1500, "Launch/css/images/Popular-item3.jpg-84"], "isController": false}, {"data": [1.0, 500, 1500, "Click Pay Now/order/api/v1/carts/800075438-131"], "isController": false}, {"data": [0.7647058823529411, 500, 1500, "Launch/css/images/Popular-item1.jpg-86"], "isController": false}, {"data": [0.43333333333333335, 500, 1500, "Choose Item/catalog/api/v1/categories/all_data-103"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136"], "isController": false}, {"data": [0.84375, 500, 1500, "Click Item/app/views/category-page.html-93"], "isController": false}, {"data": [0.8235294117647058, 500, 1500, "Launch/catalog/api/v1/categories-60"], "isController": false}, {"data": [0.5, 500, 1500, "Click Item/catalog/fetchImage-96"], "isController": false}, {"data": [0.34375, 500, 1500, "Click Item/catalog/fetchImage-95"], "isController": false}, {"data": [0.6470588235294118, 500, 1500, "Launch/css/images/Banner2.jpg-82"], "isController": false}, {"data": [0.20588235294117646, 500, 1500, "Launch/css/images/Banner1.jpg-81"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "Click Pay Now/offline/common/serviceworker.js-135"], "isController": false}, {"data": [0.5294117647058824, 500, 1500, "Launch/css/images/Banner3.jpg-83"], "isController": false}, {"data": [1.0, 500, 1500, "Choose Item/css/images/review_right.png-108"], "isController": false}, {"data": [0.5277777777777778, 500, 1500, "Launch/css/main.min.css-42"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128"], "isController": false}, {"data": [0.4666666666666667, 500, 1500, "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/accountservice/ws/GetCountriesRequest-124"], "isController": false}, {"data": [1.0, 500, 1500, "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111"], "isController": false}, {"data": [0.90625, 500, 1500, "Click Item/css/images/Filter.png-99"], "isController": false}, {"data": [0.7941176470588235, 500, 1500, "Launch/css/images/arrow_right.png-66"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/css/images/Bell.png-123"], "isController": false}, {"data": [0.9, 500, 1500, "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129"], "isController": false}, {"data": [0.23529411764705882, 500, 1500, "Launch/main.min.js-49"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "Click Checkout/css/images/Shipex.png-127"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/order/api/v1/shippingcost/-120"], "isController": false}, {"data": [0.9705882352941176, 500, 1500, "Launch/css/images/GoUp.png-77"], "isController": false}, {"data": [0.6, 500, 1500, "Click Item/catalog/fetchImage-98"], "isController": false}, {"data": [0.9, 500, 1500, "Click Item/catalog/fetchImage-102"], "isController": false}, {"data": [0.8823529411764706, 500, 1500, "Launch/catalog/fetchImage-67"], "isController": false}, {"data": [0.6333333333333333, 500, 1500, "Click Item/catalog/fetchImage-97"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "Click Item/catalog/fetchImage-101"], "isController": false}, {"data": [0.6764705882352942, 500, 1500, "Launch/catalog/fetchImage-68"], "isController": false}, {"data": [0.7058823529411765, 500, 1500, "Launch/catalog/fetchImage-69"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "Choose Item/catalog/api/v1/products/20-104"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "Click Checkout/css/images/Check.png-125"], "isController": false}, {"data": [0.8, 500, 1500, "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134"], "isController": false}, {"data": [0.4666666666666667, 500, 1500, "Choose Item/treatment/get-106"], "isController": false}, {"data": [0.3125, 500, 1500, "Click Item/catalog/api/v1/categories/4/products-91"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "Click Cart/css/images/SafePay.png-116"], "isController": false}, {"data": [0.7777777777777778, 500, 1500, "Launch/css/images/Down_arrow.svg-44"], "isController": false}, {"data": [0.6470588235294118, 500, 1500, "Launch/css/images/Special-offer.jpg-75"], "isController": false}, {"data": [0.40625, 500, 1500, "Click Item/catalog/api/v1/categories/attributes-92"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/app/order/views/orderPayment-page.html-122"], "isController": false}, {"data": [0.8823529411764706, 500, 1500, "Launch/app/tempFiles/popularProducts.json-64"], "isController": false}, {"data": [0.4117647058823529, 500, 1500, "Launch/catalog/fetchImage-70"], "isController": false}, {"data": [0.7058823529411765, 500, 1500, "Launch/css/images/Popular-item2.jpg-85"], "isController": false}, {"data": [0.7352941176470589, 500, 1500, "Launch/catalog/fetchImage-71"], "isController": false}, {"data": [0.6470588235294118, 500, 1500, "Login/accountservice/ws/AccountLoginRequest-89"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "Click Checkout/css/images/User.jpg-126"], "isController": false}, {"data": [0.7941176470588235, 500, 1500, "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54"], "isController": false}, {"data": [0.7666666666666667, 500, 1500, "Click Logout/accountservice/ws/AccountLogoutRequest-141"], "isController": false}, {"data": [0.8888888888888888, 500, 1500, "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39"], "isController": false}, {"data": [0.38235294117647056, 500, 1500, "Login/css/main.min.css-88"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "Choose Item/app/views/product-page.html-107"], "isController": false}, {"data": [0.6176470588235294, 500, 1500, "Login/order/api/v1/carts/800075438-90"], "isController": false}, {"data": [0.6111111111111112, 500, 1500, "Launch/-41"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1542, 0, 0.0, 890.5966277561594, 80, 24105, 444.0, 1681.5000000000007, 2976.049999999999, 6257.809999999985, 2.5684717593032147, 92.42897286010657, 1.9456815122085693], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/catalog/fetchImage-33", 20, 0, 0.0, 1116.25, 556, 4784, 736.0, 2845.200000000003, 4693.949999999999, 4784.0, 0.03347190702843104, 2.101911549230481, 0.020756504846732138], "isController": false}, {"data": ["Click Pay Now/order/api/v1/orders/users/800075438-130", 15, 0, 0.0, 699.1999999999999, 552, 1595, 596.0, 1385.0, 1595.0, 1595.0, 0.04131946835617382, 0.029128073135458992, 0.07033186850079196], "isController": false}, {"data": ["Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", 17, 0, 0.0, 1129.7647058823532, 299, 3257, 485.0, 3134.6, 3257.0, 3257.0, 0.03255931541166466, 0.7939830714303499, 0.02076292281622756], "isController": false}, {"data": ["Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", 15, 0, 0.0, 419.2, 314, 950, 352.0, 757.4000000000001, 950.0, 950.0, 0.040986182191777076, 0.0725663557750897, 0.05083247205425478], "isController": false}, {"data": ["Click Checkout/order/api/v1/carts/800075438-119", 15, 0, 0.0, 486.93333333333334, 434, 590, 483.0, 549.8000000000001, 590.0, 590.0, 0.040969166605212916, 0.0303907997591013, 0.025645738080020974], "isController": false}, {"data": ["Click Item/css/images/category_banner_4.png-94", 15, 0, 0.0, 2064.5333333333333, 970, 6118, 1686.0, 4484.800000000001, 6118.0, 6118.0, 0.040997944636375565, 18.5165375245646, 0.025303418955263043], "isController": false}, {"data": ["Launch/css/images/linkedin.png-80", 17, 0, 0.0, 747.3529411764706, 281, 3426, 313.0, 3093.2, 3426.0, 3426.0, 0.03347412155044255, 0.06881154869500153, 0.02036560324797432], "isController": false}, {"data": ["Click Cart/order/api/v1/carts/800075438-113", 15, 0, 0.0, 818.6666666666667, 447, 2266, 526.0, 2179.0, 2266.0, 2266.0, 0.041003099834347474, 0.030402623959204646, 0.02566697948614915], "isController": false}, {"data": ["Choose Item/catalog/api/v1/categories/4/products-105", 15, 0, 0.0, 1043.2666666666669, 946, 1160, 1022.0, 1153.4, 1160.0, 1160.0, 0.04123518625933633, 0.09715772304112248, 0.02424177942199265], "isController": false}, {"data": ["Choose Item/css/images/review_Left_disabled.png-110", 15, 0, 0.0, 323.06666666666666, 273, 423, 311.0, 396.0, 423.0, 423.0, 0.041329373060963584, 0.059935663081573165, 0.025629054583703], "isController": false}, {"data": ["/catalog/fetchImage-36", 19, 0, 0.0, 844.5263157894738, 326, 3955, 521.0, 1885.0, 3955.0, 3955.0, 0.03187448833058206, 2.86817150687063, 0.019672535766531118], "isController": false}, {"data": ["/catalog/fetchImage-37", 20, 0, 0.0, 944.15, 313, 4388, 587.0, 2721.2000000000016, 4308.499999999999, 4388.0, 0.03347851850859896, 1.9791656640547841, 0.02085868633641224], "isController": false}, {"data": ["Launch/css/images/closeDark.png-57", 17, 0, 0.0, 607.0588235294117, 276, 3023, 341.0, 1982.999999999999, 3023.0, 3023.0, 0.032327565715285424, 0.047228553037174804, 0.019699610357752056], "isController": false}, {"data": ["/catalog/fetchImage-34", 20, 0, 0.0, 1908.25, 823, 10612, 1006.0, 6236.400000000009, 10415.149999999998, 10612.0, 0.03339031947857677, 1.5737454291782977, 0.020705911004781495], "isController": false}, {"data": ["Launch/css/images/logo.png-56", 17, 0, 0.0, 533.8823529411765, 261, 1630, 344.0, 1152.3999999999996, 1630.0, 1630.0, 0.03232805752112258, 0.09606863187185158, 0.019542058208569215], "isController": false}, {"data": ["/catalog/fetchImage-35", 19, 0, 0.0, 1431.3157894736842, 599, 4861, 927.0, 4022.0, 4861.0, 4861.0, 0.03185257955600857, 7.136169672823714, 0.019783438083614695], "isController": false}, {"data": ["Launch/catalog/api/v1/deals/search-62", 17, 0, 0.0, 799.7647058823529, 368, 3103, 459.0, 2562.1999999999994, 3103.0, 3103.0, 0.03289753771605942, 0.025155050812182153, 0.0196292925239378], "isController": false}, {"data": ["Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", 17, 0, 0.0, 526.5882352941177, 300, 1984, 386.0, 966.3999999999991, 1984.0, 1984.0, 0.03318802185724075, 0.8212414900787338, 0.021099025614320047], "isController": false}, {"data": ["Click Cart/app/views/shoppingCart.html-114", 15, 0, 0.0, 312.3333333333333, 277, 365, 301.0, 361.4, 365.0, 365.0, 0.0410288952833182, 0.07704938049787197, 0.022798282633015678], "isController": false}, {"data": ["Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", 17, 0, 0.0, 908.8823529411762, 292, 4916, 382.0, 3027.1999999999985, 4916.0, 4916.0, 0.03170352356690749, 0.7868604018095253, 0.02034103025728342], "isController": false}, {"data": ["Launch/accountservice/ws/GetAccountConfigurationRequest-59", 17, 0, 0.0, 451.2352941176471, 296, 1200, 392.0, 710.3999999999995, 1200.0, 1200.0, 0.032739780373849774, 0.050196733581000144, 0.03852679233446189], "isController": false}, {"data": ["Click Checkout/accountservice/ws/GetAccountByIdRequest-117", 15, 0, 0.0, 537.4666666666666, 320, 1339, 346.0, 1158.4, 1339.0, 1339.0, 0.040940317205577705, 0.07524382517665747, 0.050295819379508555], "isController": false}, {"data": ["Launch/app/views/home-page.html-65", 17, 0, 0.0, 441.8823529411764, 290, 1061, 354.0, 880.1999999999998, 1061.0, 1061.0, 0.03309330950615049, 0.08696689050883884, 0.01829180974656365], "isController": false}, {"data": ["Launch/css/images/chat_logo.png-76", 17, 0, 0.0, 417.8823529411765, 282, 1398, 339.0, 670.7999999999994, 1398.0, 1398.0, 0.03318633738011435, 0.11022141936500872, 0.020222924341007184], "isController": false}, {"data": ["Launch/css/images/facebook.png-78", 17, 0, 0.0, 453.2352941176471, 273, 988, 322.0, 968.8, 988.0, 988.0, 0.033211752271586174, 0.06425046997071504, 0.020205978188670103], "isController": false}, {"data": ["Launch/css/images/twitter.png-79", 17, 0, 0.0, 613.3529411764705, 287, 3366, 342.0, 1753.1999999999985, 3366.0, 3366.0, 0.03324949245627692, 0.07994165080796267, 0.020196469050590082], "isController": false}, {"data": ["Choose Item/css/images/reviewUser.png-109", 15, 0, 0.0, 354.8666666666667, 272, 944, 318.0, 605.0000000000002, 944.0, 944.0, 0.0413388268040953, 0.07831769921869616, 0.025231217531796447], "isController": false}, {"data": ["Click Cart/css/images/Master_credit.png-115", 15, 0, 0.0, 370.8666666666666, 270, 726, 310.0, 678.0, 726.0, 726.0, 0.04103652798144055, 0.08211313069723797, 0.025166933176117835], "isController": false}, {"data": ["Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", 17, 0, 0.0, 808.8235294117648, 289, 4008, 342.0, 2431.9999999999986, 4008.0, 4008.0, 0.0323295945108152, 0.22016364717762643, 0.01947984356755174], "isController": false}, {"data": ["Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", 17, 0, 0.0, 486.764705882353, 308, 1142, 341.0, 1096.3999999999999, 1142.0, 1142.0, 0.03315682201612982, 0.8160658059301951, 0.02107919055908253], "isController": false}, {"data": ["Click Item/catalog/fetchImage-100", 15, 0, 0.0, 601.0, 301, 3800, 341.0, 1910.600000000001, 3800.0, 3800.0, 0.04165567419708688, 2.070091746622419, 0.025709361418514556], "isController": false}, {"data": ["Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", 15, 0, 0.0, 658.4666666666667, 591, 791, 657.0, 755.0, 791.0, 791.0, 0.04137406011926762, 0.03449993242236847, 0.03365682820249017], "isController": false}, {"data": ["Launch/vendor/requirejs/require.js-43", 18, 0, 0.0, 1359.9444444444446, 491, 4587, 763.5, 3127.2000000000025, 4587.0, 4587.0, 0.030866738003127826, 0.6477024590072571, 0.01709125043727879], "isController": false}, {"data": ["Click Profile/treatment/get-139", 15, 0, 0.0, 322.0, 278, 411, 319.0, 383.40000000000003, 411.0, 411.0, 0.041611069654156535, 0.029799594153367307, 0.10150825390242482], "isController": false}, {"data": ["Click Profile/treatment/get-138", 15, 0, 0.0, 1293.9333333333332, 1160, 1570, 1274.0, 1492.0, 1570.0, 1570.0, 0.04148241560402545, 0.029734465872416682, 0.10119440837778866], "isController": false}, {"data": ["Launch/services.properties-52", 17, 0, 0.0, 784.7058823529411, 267, 3005, 457.0, 1921.799999999999, 3005.0, 3005.0, 0.03230330139740282, 0.04347065363830184, 0.01750813698785016], "isController": false}, {"data": ["Login/css/images/FacebookLogo.png-87", 17, 0, 0.0, 1903.2941176470583, 299, 6053, 964.0, 5972.2, 6053.0, 6053.0, 0.0334241027103015, 0.046578315007422114, 0.020987986369847528], "isController": false}, {"data": ["Launch/css/images/Popular-item3.jpg-84", 17, 0, 0.0, 846.4117647058822, 293, 4970, 343.0, 2671.599999999998, 4970.0, 4970.0, 0.033581374584430494, 0.8650811329713788, 0.02059482738185776], "isController": false}, {"data": ["Click Pay Now/order/api/v1/carts/800075438-131", 15, 0, 0.0, 419.2, 357, 483, 415.0, 481.2, 483.0, 483.0, 0.041343840181251396, 0.025274652298304078, 0.031169379511646562], "isController": false}, {"data": ["Launch/css/images/Popular-item1.jpg-86", 17, 0, 0.0, 942.9411764705884, 304, 4981, 445.0, 3290.5999999999985, 4981.0, 4981.0, 0.03383461639506095, 1.4253492988770888, 0.020750135836033468], "isController": false}, {"data": ["Choose Item/catalog/api/v1/categories/all_data-103", 15, 0, 0.0, 1401.2, 1266, 1947, 1353.0, 1723.2, 1947.0, 1947.0, 0.04120697991297086, 0.358868261456914, 0.02414471479275636], "isController": false}, {"data": ["Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", 15, 0, 0.0, 236.73333333333335, 80, 1157, 160.0, 681.2000000000003, 1157.0, 1157.0, 0.041372120155669496, 2.988489241869689, 0.026706026780173378], "isController": false}, {"data": ["Click Item/app/views/category-page.html-93", 16, 0, 0.0, 571.5625, 262, 2855, 318.5, 1533.4000000000015, 2855.0, 2855.0, 0.03397179067431881, 0.03828461566226944, 0.018910078793321995], "isController": false}, {"data": ["Launch/catalog/api/v1/categories-60", 17, 0, 0.0, 608.4117647058824, 375, 2061, 449.0, 1488.1999999999994, 2061.0, 2061.0, 0.032791944755217774, 0.15717641764881757, 0.01892581967806026], "isController": false}, {"data": ["Click Item/catalog/fetchImage-96", 15, 0, 0.0, 1117.3333333333333, 325, 2713, 799.0, 2433.4, 2713.0, 2713.0, 0.0406019922044175, 2.1591219565423345, 0.025059042063663925], "isController": false}, {"data": ["Click Item/catalog/fetchImage-95", 16, 0, 0.0, 1541.1249999999998, 847, 4088, 1132.5, 3234.7000000000007, 4088.0, 4088.0, 0.034142437983462254, 1.5742468825020006, 0.02107228594291811], "isController": false}, {"data": ["Launch/css/images/Banner2.jpg-82", 17, 0, 0.0, 1532.9411764705883, 348, 11968, 503.0, 5145.599999999994, 11968.0, 11968.0, 0.033508959704490394, 2.797605452203411, 0.020354075133001002], "isController": false}, {"data": ["Launch/css/images/Banner1.jpg-81", 17, 0, 0.0, 5438.823529411765, 754, 24105, 1857.0, 23230.6, 24105.0, 24105.0, 0.03369339014963829, 16.34593364446041, 0.02046610221979982], "isController": false}, {"data": ["Click Pay Now/offline/common/serviceworker.js-135", 15, 0, 0.0, 462.20000000000005, 377, 605, 450.0, 567.2, 605.0, 605.0, 0.04134680320299902, 0.08998582579902696, 0.028062527564535467], "isController": false}, {"data": ["Launch/css/images/Banner3.jpg-83", 17, 0, 0.0, 1711.2941176470586, 325, 9029, 671.0, 6516.199999999998, 9029.0, 9029.0, 0.03366123334758986, 2.263487836538081, 0.020446569474805557], "isController": false}, {"data": ["Choose Item/css/images/review_right.png-108", 15, 0, 0.0, 327.93333333333334, 274, 446, 308.0, 434.6, 446.0, 446.0, 0.041339966101227796, 0.059466572331160684, 0.025312655024872878], "isController": false}, {"data": ["Launch/css/main.min.css-42", 18, 0, 0.0, 891.0, 317, 2066, 693.0, 1940.9, 2066.0, 2066.0, 0.030995150980824338, 0.9261096183334596, 0.01725316021393542], "isController": false}, {"data": ["Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", 15, 0, 0.0, 357.79999999999995, 306, 492, 338.0, 480.6, 492.0, 492.0, 0.04099480732440558, 0.041090888904072156, 0.05260466486745013], "isController": false}, {"data": ["Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", 15, 0, 0.0, 107.66666666666669, 93, 133, 105.0, 128.8, 133.0, 133.0, 0.04101857320994946, 0.02984261429825425, 0.03541056515390169], "isController": false}, {"data": ["Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", 15, 0, 0.0, 1299.533333333333, 1150, 1642, 1276.0, 1533.4, 1642.0, 1642.0, 0.041358659538271926, 0.07253921145579725, 0.035502208724747096], "isController": false}, {"data": ["Click Checkout/accountservice/ws/GetCountriesRequest-124", 15, 0, 0.0, 332.00000000000006, 281, 401, 320.0, 396.8, 401.0, 401.0, 0.04099996173336905, 0.20024317248137236, 0.046485308176212374], "isController": false}, {"data": ["Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", 15, 0, 0.0, 224.8, 183, 309, 215.0, 275.40000000000003, 309.0, 309.0, 0.041334725854319895, 0.026843352239377664, 0.03035518929926617], "isController": false}, {"data": ["Click Item/css/images/Filter.png-99", 16, 0, 0.0, 440.81249999999994, 284, 997, 403.0, 755.5000000000002, 997.0, 997.0, 0.034152057768205714, 0.06046648509155953, 0.02071135534575757], "isController": false}, {"data": ["Launch/css/images/arrow_right.png-66", 17, 0, 0.0, 678.7647058823528, 288, 3305, 378.0, 1477.7999999999984, 3305.0, 3305.0, 0.0330880277783725, 0.04497903776122512, 0.020744642415737445], "isController": false}, {"data": ["Click Checkout/css/images/Bell.png-123", 15, 0, 0.0, 311.1333333333333, 264, 381, 300.0, 366.6, 381.0, 381.0, 0.040997608472839085, 0.06874306030064913, 0.025423321660403144], "isController": false}, {"data": ["Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", 15, 0, 0.0, 460.6, 276, 1351, 334.0, 1128.4, 1351.0, 1351.0, 0.04134953867698016, 0.04736621959775168, 0.05637105077447686], "isController": false}, {"data": ["Launch/main.min.js-49", 17, 0, 0.0, 3219.058823529412, 895, 7738, 1994.0, 7327.599999999999, 7738.0, 7738.0, 0.03191751013380947, 8.383755225318845, 0.017174363363016615], "isController": false}, {"data": ["Click Checkout/css/images/Shipex.png-127", 15, 0, 0.0, 381.19999999999993, 284, 1082, 317.0, 701.6000000000003, 1082.0, 1082.0, 0.041105913496715635, 0.1038887735639649, 0.02492848855611368], "isController": false}, {"data": ["Click Checkout/order/api/v1/shippingcost/-120", 15, 0, 0.0, 352.5333333333333, 303, 460, 341.0, 440.8, 460.0, 460.0, 0.04099603978255701, 0.02746414383870518, 0.038633963271647954], "isController": false}, {"data": ["Launch/css/images/GoUp.png-77", 17, 0, 0.0, 372.94117647058823, 277, 883, 318.0, 562.9999999999998, 883.0, 883.0, 0.033187438749653485, 0.08141293568274371, 0.0200615474473003], "isController": false}, {"data": ["Click Item/catalog/fetchImage-98", 15, 0, 0.0, 1254.8666666666668, 300, 5766, 588.0, 4218.000000000001, 5766.0, 5766.0, 0.040754557038719545, 1.9952619218966083, 0.02515320317233472], "isController": false}, {"data": ["Click Item/catalog/fetchImage-102", 15, 0, 0.0, 512.1999999999999, 318, 1477, 391.0, 1181.8000000000002, 1477.0, 1477.0, 0.04172601032579669, 2.412507728004829, 0.025752771997952645], "isController": false}, {"data": ["Launch/catalog/fetchImage-67", 17, 0, 0.0, 441.05882352941177, 318, 735, 391.0, 704.6, 735.0, 735.0, 0.03310826206942218, 2.079036435764129, 0.020531002357503013], "isController": false}, {"data": ["Click Item/catalog/fetchImage-97", 15, 0, 0.0, 964.0666666666665, 311, 4256, 571.0, 3102.8000000000006, 4256.0, 4256.0, 0.04086993008517293, 2.881497701577307, 0.025224409974442672], "isController": false}, {"data": ["Click Item/catalog/fetchImage-101", 15, 0, 0.0, 485.40000000000003, 317, 986, 378.0, 871.4000000000001, 986.0, 986.0, 0.04167870718207482, 2.8989196054207325, 0.025723577088936803], "isController": false}, {"data": ["Launch/catalog/fetchImage-68", 17, 0, 0.0, 590.8235294117648, 325, 2111, 521.0, 1070.999999999999, 2111.0, 2111.0, 0.033097239690209834, 1.5598690280168133, 0.020524167190706294], "isController": false}, {"data": ["Launch/catalog/fetchImage-69", 17, 0, 0.0, 704.8235294117649, 316, 1804, 511.0, 1403.1999999999996, 1804.0, 1804.0, 0.03310561860769452, 2.979077781529207, 0.020432373984436463], "isController": false}, {"data": ["Choose Item/catalog/api/v1/products/20-104", 15, 0, 0.0, 564.3333333333334, 364, 1037, 405.0, 1024.4, 1037.0, 1037.0, 0.04131924071763258, 0.040789299934991065, 0.023887686039881333], "isController": false}, {"data": ["Click Checkout/css/images/Check.png-125", 15, 0, 0.0, 343.66666666666663, 259, 559, 321.0, 487.00000000000006, 559.0, 559.0, 0.041001306574969525, 0.14202308048966494, 0.02546565525554748], "isController": false}, {"data": ["Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", 15, 0, 0.0, 480.53333333333336, 397, 631, 476.0, 612.4, 631.0, 631.0, 0.04135136252739528, 0.05517014793449944, 0.11924860697597486], "isController": false}, {"data": ["Choose Item/treatment/get-106", 15, 0, 0.0, 1327.3333333333335, 1119, 1908, 1293.0, 1639.2000000000003, 1908.0, 1908.0, 0.04120075479782789, 0.02951916058268854, 0.10050731004392], "isController": false}, {"data": ["Click Item/catalog/api/v1/categories/4/products-91", 16, 0, 0.0, 1740.1875, 957, 5039, 1042.0, 4557.400000000001, 5039.0, 5039.0, 0.03347112278881395, 0.07877889630018577, 0.019677359295767576], "isController": false}, {"data": ["Click Cart/css/images/SafePay.png-116", 15, 0, 0.0, 335.9333333333333, 276, 504, 314.0, 451.8, 504.0, 504.0, 0.04104113142191104, 0.20231995255645208, 0.024929281000418618], "isController": false}, {"data": ["Launch/css/images/Down_arrow.svg-44", 18, 0, 0.0, 632.8888888888889, 279, 1965, 358.5, 1328.700000000001, 1965.0, 1965.0, 0.030885857880440844, 0.03604355485070977, 0.018851231616480005], "isController": false}, {"data": ["Launch/css/images/Special-offer.jpg-75", 17, 0, 0.0, 1384.5882352941176, 332, 7708, 516.0, 6325.5999999999985, 7708.0, 7708.0, 0.03344303961819852, 2.6528103311205187, 0.02050998914084831], "isController": false}, {"data": ["Click Item/catalog/api/v1/categories/attributes-92", 16, 0, 0.0, 1461.9375, 700, 5111, 821.0, 4516.700000000001, 5111.0, 5111.0, 0.03362630249381066, 0.03231277505264618, 0.019768587989525407], "isController": false}, {"data": ["Click Checkout/app/order/views/orderPayment-page.html-122", 15, 0, 0.0, 339.80000000000007, 272, 420, 325.0, 418.2, 420.0, 420.0, 0.040999065221312955, 0.05493234129261852, 0.02322212678550929], "isController": false}, {"data": ["Launch/app/tempFiles/popularProducts.json-64", 17, 0, 0.0, 452.5294117647059, 279, 1021, 322.0, 994.6, 1021.0, 1021.0, 0.03307611787550149, 0.031170364990096622, 0.019380537817676655], "isController": false}, {"data": ["Launch/catalog/fetchImage-70", 17, 0, 0.0, 1389.7058823529412, 533, 4316, 919.0, 3995.9999999999995, 4316.0, 4316.0, 0.033130587132469726, 7.422728386676827, 0.02057720060180737], "isController": false}, {"data": ["Launch/css/images/Popular-item2.jpg-85", 17, 0, 0.0, 1224.8823529411766, 296, 6019, 447.0, 4472.5999999999985, 6019.0, 6019.0, 0.033610720633621395, 0.9350607513775453, 0.02061282476358812], "isController": false}, {"data": ["Launch/catalog/fetchImage-71", 17, 0, 0.0, 687.3529411764706, 338, 3394, 490.0, 1328.3999999999983, 3394.0, 3394.0, 0.03310226653166134, 1.9569490267690244, 0.020624263717968692], "isController": false}, {"data": ["Login/accountservice/ws/AccountLoginRequest-89", 17, 0, 0.0, 1478.7647058823527, 373, 5995, 489.0, 5227.799999999999, 5995.0, 5995.0, 0.03471236719967166, 0.0522898899975293, 0.04227179872850641], "isController": false}, {"data": ["Click Checkout/css/images/User.jpg-126", 15, 0, 0.0, 373.86666666666673, 279, 986, 320.0, 647.0000000000002, 986.0, 986.0, 0.041031027663118856, 0.21204706874338375, 0.024802935667451727], "isController": false}, {"data": ["Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", 17, 0, 0.0, 658.5882352941178, 278, 2406, 411.0, 1900.3999999999996, 2406.0, 2406.0, 0.032676032514574474, 0.811890913347967, 0.020901173141646755], "isController": false}, {"data": ["Click Logout/accountservice/ws/AccountLogoutRequest-141", 15, 0, 0.0, 722.1333333333334, 389, 2086, 445.0, 1571.8000000000002, 2086.0, 2086.0, 0.041213093674614384, 0.04643717527516609, 0.05046994088668597], "isController": false}, {"data": ["/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", 18, 0, 0.0, 575.7777777777778, 290, 2687, 412.0, 1604.3000000000018, 2687.0, 2687.0, 0.030902401631646807, 0.7605793245335882, 0.019645960412306707], "isController": false}, {"data": ["Login/css/main.min.css-88", 17, 0, 0.0, 2796.352941176471, 355, 14028, 823.0, 13225.599999999999, 14028.0, 14028.0, 0.03377733977619533, 1.0092590735620788, 0.02084695189312055], "isController": false}, {"data": ["Choose Item/app/views/product-page.html-107", 15, 0, 0.0, 321.2, 278, 520, 306.0, 422.20000000000005, 520.0, 520.0, 0.04131502985699491, 0.11369702552442544, 0.022957277332646586], "isController": false}, {"data": ["Login/order/api/v1/carts/800075438-90", 17, 0, 0.0, 1190.2352941176468, 379, 4221, 559.0, 3310.599999999999, 4221.0, 4221.0, 0.03503912014708186, 0.021275476789674588, 0.021933667982694794], "isController": false}, {"data": ["Launch/-41", 18, 0, 0.0, 1392.2222222222224, 286, 6125, 449.0, 5817.200000000001, 6125.0, 6125.0, 0.030791600735577133, 0.09814822734465209, 0.020176918060129154], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1542, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
