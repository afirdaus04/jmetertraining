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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9578947368421052, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "/catalog/fetchImage-33"], "isController": false}, {"data": [0.9, 500, 1500, "Click Pay Now/order/api/v1/orders/users/800075438-130"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/order/api/v1/carts/800075438-119"], "isController": false}, {"data": [1.0, 500, 1500, "Click Item/css/images/category_banner_4.png-94"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/linkedin.png-80"], "isController": false}, {"data": [1.0, 500, 1500, "Click Cart/order/api/v1/carts/800075438-113"], "isController": false}, {"data": [0.9, 500, 1500, "Choose Item/catalog/api/v1/categories/4/products-105"], "isController": false}, {"data": [1.0, 500, 1500, "Choose Item/css/images/review_Left_disabled.png-110"], "isController": false}, {"data": [1.0, 500, 1500, "/catalog/fetchImage-36"], "isController": false}, {"data": [1.0, 500, 1500, "/catalog/fetchImage-37"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/closeDark.png-57"], "isController": false}, {"data": [0.5, 500, 1500, "/catalog/fetchImage-34"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/logo.png-56"], "isController": false}, {"data": [0.7, 500, 1500, "/catalog/fetchImage-35"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/catalog/api/v1/deals/search-62"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74"], "isController": false}, {"data": [1.0, 500, 1500, "Click Cart/app/views/shoppingCart.html-114"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/accountservice/ws/GetAccountConfigurationRequest-59"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/accountservice/ws/GetAccountByIdRequest-117"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/app/views/home-page.html-65"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/chat_logo.png-76"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/facebook.png-78"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/twitter.png-79"], "isController": false}, {"data": [1.0, 500, 1500, "Choose Item/css/images/reviewUser.png-109"], "isController": false}, {"data": [1.0, 500, 1500, "Click Cart/css/images/Master_credit.png-115"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73"], "isController": false}, {"data": [1.0, 500, 1500, "Click Item/catalog/fetchImage-100"], "isController": false}, {"data": [0.5, 500, 1500, "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/vendor/requirejs/require.js-43"], "isController": false}, {"data": [1.0, 500, 1500, "Click Profile/treatment/get-139"], "isController": false}, {"data": [1.0, 500, 1500, "Click Profile/treatment/get-138"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/services.properties-52"], "isController": false}, {"data": [1.0, 500, 1500, "Login/css/images/FacebookLogo.png-87"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/Popular-item3.jpg-84"], "isController": false}, {"data": [1.0, 500, 1500, "Click Pay Now/order/api/v1/carts/800075438-131"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/Popular-item1.jpg-86"], "isController": false}, {"data": [0.5, 500, 1500, "Choose Item/catalog/api/v1/categories/all_data-103"], "isController": false}, {"data": [1.0, 500, 1500, "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136"], "isController": false}, {"data": [1.0, 500, 1500, "Click Item/app/views/category-page.html-93"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/catalog/api/v1/categories-60"], "isController": false}, {"data": [1.0, 500, 1500, "Click Item/catalog/fetchImage-96"], "isController": false}, {"data": [1.0, 500, 1500, "Click Item/catalog/fetchImage-95"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/Banner2.jpg-82"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/Banner1.jpg-81"], "isController": false}, {"data": [1.0, 500, 1500, "Click Pay Now/offline/common/serviceworker.js-135"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/Banner3.jpg-83"], "isController": false}, {"data": [1.0, 500, 1500, "Choose Item/css/images/review_right.png-108"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/main.min.css-42"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128"], "isController": false}, {"data": [0.5, 500, 1500, "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/accountservice/ws/GetCountriesRequest-124"], "isController": false}, {"data": [1.0, 500, 1500, "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111"], "isController": false}, {"data": [1.0, 500, 1500, "Click Item/css/images/Filter.png-99"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/arrow_right.png-66"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/css/images/Bell.png-123"], "isController": false}, {"data": [1.0, 500, 1500, "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129"], "isController": false}, {"data": [0.5, 500, 1500, "Launch/main.min.js-49"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/css/images/Shipex.png-127"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/order/api/v1/shippingcost/-120"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/GoUp.png-77"], "isController": false}, {"data": [1.0, 500, 1500, "Click Item/catalog/fetchImage-98"], "isController": false}, {"data": [1.0, 500, 1500, "Click Item/catalog/fetchImage-102"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/catalog/fetchImage-67"], "isController": false}, {"data": [1.0, 500, 1500, "Click Item/catalog/fetchImage-97"], "isController": false}, {"data": [1.0, 500, 1500, "Click Item/catalog/fetchImage-101"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/catalog/fetchImage-68"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/catalog/fetchImage-69"], "isController": false}, {"data": [1.0, 500, 1500, "Choose Item/catalog/api/v1/products/20-104"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/css/images/Check.png-125"], "isController": false}, {"data": [1.0, 500, 1500, "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134"], "isController": false}, {"data": [0.5, 500, 1500, "Choose Item/treatment/get-106"], "isController": false}, {"data": [1.0, 500, 1500, "Click Item/catalog/api/v1/categories/4/products-91"], "isController": false}, {"data": [1.0, 500, 1500, "Click Cart/css/images/SafePay.png-116"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/Down_arrow.svg-44"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/Special-offer.jpg-75"], "isController": false}, {"data": [1.0, 500, 1500, "Click Item/catalog/api/v1/categories/attributes-92"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/app/order/views/orderPayment-page.html-122"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/app/tempFiles/popularProducts.json-64"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/catalog/fetchImage-70"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/Popular-item2.jpg-85"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/catalog/fetchImage-71"], "isController": false}, {"data": [1.0, 500, 1500, "Login/accountservice/ws/AccountLoginRequest-89"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/css/images/User.jpg-126"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54"], "isController": false}, {"data": [1.0, 500, 1500, "Click Logout/accountservice/ws/AccountLogoutRequest-141"], "isController": false}, {"data": [1.0, 500, 1500, "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39"], "isController": false}, {"data": [1.0, 500, 1500, "Login/css/main.min.css-88"], "isController": false}, {"data": [1.0, 500, 1500, "Choose Item/app/views/product-page.html-107"], "isController": false}, {"data": [1.0, 500, 1500, "Login/order/api/v1/carts/800075438-90"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/-41"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 475, 0, 0.0, 315.1873684210528, 24, 1282, 259.0, 481.2000000000001, 530.1999999999998, 1272.72, 11.382152784434007, 396.14723956586073, 8.741722666359149], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/catalog/fetchImage-33", 5, 0, 0.0, 515.4, 509, 528, 514.0, 528.0, 528.0, 528.0, 0.4001600640256103, 25.12716023909564, 0.24814613345338138], "isController": false}, {"data": ["Click Pay Now/order/api/v1/orders/users/800075438-130", 5, 0, 0.0, 488.8, 472, 508, 484.0, 508.0, 508.0, 508.0, 0.41476565740356697, 0.29211815636665284, 0.7059927156781418], "isController": false}, {"data": ["Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", 5, 0, 0.0, 257.0, 254, 264, 256.0, 264.0, 264.0, 264.0, 0.41844505816386307, 10.204093308017407, 0.26684045212988533], "isController": false}, {"data": ["Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", 5, 0, 0.0, 285.0, 283, 290, 283.0, 290.0, 290.0, 290.0, 0.4217985490129914, 0.7467976263286655, 0.5231290598110343], "isController": false}, {"data": ["Click Checkout/order/api/v1/carts/800075438-119", 5, 0, 0.0, 421.4, 407, 442, 414.0, 442.0, 442.0, 442.0, 0.4172926055750292, 0.309709355700217, 0.26121539079452516], "isController": false}, {"data": ["Click Item/css/images/category_banner_4.png-94", 5, 0, 0.0, 275.0, 267, 283, 274.0, 283.0, 283.0, 283.0, 0.42162071000927565, 190.4230996764061, 0.2602190319588498], "isController": false}, {"data": ["Launch/css/images/linkedin.png-80", 5, 0, 0.0, 254.0, 252, 257, 252.0, 257.0, 257.0, 257.0, 0.41939271934239225, 0.8621305412263043, 0.25515787514678745], "isController": false}, {"data": ["Click Cart/order/api/v1/carts/800075438-113", 5, 0, 0.0, 421.0, 412, 430, 422.0, 430.0, 430.0, 430.0, 0.4173971116119876, 0.3097869187745221, 0.26128080912430085], "isController": false}, {"data": ["Choose Item/catalog/api/v1/categories/4/products-105", 5, 0, 0.0, 488.4, 474, 509, 487.0, 509.0, 509.0, 509.0, 0.4134281461881925, 0.9701834329006119, 0.24305053125516787], "isController": false}, {"data": ["Choose Item/css/images/review_Left_disabled.png-110", 5, 0, 0.0, 252.8, 251, 255, 252.0, 255.0, 255.0, 255.0, 0.4236211132762857, 0.614333352749301, 0.2626947333305092], "isController": false}, {"data": ["/catalog/fetchImage-36", 5, 0, 0.0, 260.2, 259, 263, 260.0, 263.0, 263.0, 263.0, 0.40873048311943105, 36.77967638763999, 0.2522633450502738], "isController": false}, {"data": ["/catalog/fetchImage-37", 5, 0, 0.0, 259.4, 257, 264, 258.0, 264.0, 264.0, 264.0, 0.40879731828959204, 24.166708185144305, 0.25469989166871065], "isController": false}, {"data": ["Launch/css/images/closeDark.png-57", 5, 0, 0.0, 256.0, 253, 264, 255.0, 264.0, 264.0, 264.0, 0.41750167000668004, 0.6099438460253841, 0.2544150801603206], "isController": false}, {"data": ["/catalog/fetchImage-34", 5, 0, 0.0, 1277.6, 1272, 1282, 1278.0, 1282.0, 1282.0, 1282.0, 0.3769317753486619, 17.765118497926874, 0.23374187240859404], "isController": false}, {"data": ["Launch/css/images/logo.png-56", 5, 0, 0.0, 256.8, 254, 265, 255.0, 265.0, 265.0, 265.0, 0.41788549937317176, 1.2418218501880485, 0.2526085196406185], "isController": false}, {"data": ["/catalog/fetchImage-35", 5, 0, 0.0, 415.4, 265, 518, 511.0, 518.0, 518.0, 518.0, 0.4085634907664651, 91.53067035054748, 0.2537562305932342], "isController": false}, {"data": ["Launch/catalog/api/v1/deals/search-62", 5, 0, 0.0, 344.6, 339, 350, 345.0, 350.0, 350.0, 350.0, 0.41493775933609955, 0.31728150933609955, 0.2475849325726141], "isController": false}, {"data": ["Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", 5, 0, 0.0, 257.2, 255, 262, 256.0, 262.0, 262.0, 262.0, 0.4191466174867969, 10.371832168455025, 0.266469187484282], "isController": false}, {"data": ["Click Cart/app/views/shoppingCart.html-114", 5, 0, 0.0, 255.0, 253, 259, 254.0, 259.0, 259.0, 259.0, 0.42365700728690053, 0.7955980713014743, 0.23541097377563125], "isController": false}, {"data": ["Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", 5, 0, 0.0, 254.2, 253, 256, 254.0, 256.0, 256.0, 256.0, 0.4174668113884946, 10.361249034607999, 0.2678473584787509], "isController": false}, {"data": ["Launch/accountservice/ws/GetAccountConfigurationRequest-59", 5, 0, 0.0, 277.0, 262, 290, 279.0, 290.0, 290.0, 290.0, 0.4173971116119876, 0.6399545558894733, 0.49117531200434095], "isController": false}, {"data": ["Click Checkout/accountservice/ws/GetAccountByIdRequest-117", 5, 0, 0.0, 287.8, 282, 301, 284.0, 301.0, 301.0, 301.0, 0.4217985490129914, 0.7752195988695799, 0.5181861080647883], "isController": false}, {"data": ["Launch/app/views/home-page.html-65", 5, 0, 0.0, 253.6, 252, 255, 254.0, 255.0, 255.0, 255.0, 0.4184800803481754, 1.0997362267743556, 0.23130832566119852], "isController": false}, {"data": ["Launch/css/images/chat_logo.png-76", 5, 0, 0.0, 254.8, 253, 257, 254.0, 257.0, 257.0, 257.0, 0.41918175720992623, 1.3922237854208583, 0.2554388832997988], "isController": false}, {"data": ["Launch/css/images/facebook.png-78", 5, 0, 0.0, 254.6, 252, 256, 255.0, 256.0, 256.0, 256.0, 0.41918175720992623, 0.810936583039906, 0.25502952611502344], "isController": false}, {"data": ["Launch/css/images/twitter.png-79", 5, 0, 0.0, 253.4, 251, 257, 252.0, 257.0, 257.0, 257.0, 0.41925205433506624, 1.00800640407513, 0.2546628689418078], "isController": false}, {"data": ["Choose Item/css/images/reviewUser.png-109", 5, 0, 0.0, 255.2, 253, 257, 255.0, 257.0, 257.0, 257.0, 0.4235493434985176, 0.8024274671749259, 0.2585140036001694], "isController": false}, {"data": ["Click Cart/css/images/Master_credit.png-115", 5, 0, 0.0, 254.2, 252, 258, 253.0, 258.0, 258.0, 258.0, 0.4235493434985176, 0.8475123094027954, 0.25975487081745025], "isController": false}, {"data": ["Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", 5, 0, 0.0, 261.4, 255, 276, 258.0, 276.0, 276.0, 276.0, 0.41827003513468297, 2.848239213861469, 0.2520240348418939], "isController": false}, {"data": ["Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", 5, 0, 0.0, 260.6, 255, 269, 256.0, 269.0, 269.0, 269.0, 0.4186552792430712, 10.304071291760865, 0.26615682303441346], "isController": false}, {"data": ["Click Item/catalog/fetchImage-100", 5, 0, 0.0, 257.8, 256, 260, 257.0, 260.0, 260.0, 260.0, 0.4224400135180804, 20.994031054621495, 0.26072469584319025], "isController": false}, {"data": ["Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", 5, 0, 0.0, 543.6, 528, 577, 539.0, 577.0, 577.0, 577.0, 0.41377027474346245, 0.34515875848229066, 0.3365924207629924], "isController": false}, {"data": ["Launch/vendor/requirejs/require.js-43", 5, 0, 0.0, 259.0, 258, 262, 258.0, 262.0, 262.0, 262.0, 0.4170141784820684, 8.751107693911592, 0.23090531171809842], "isController": false}, {"data": ["Click Profile/treatment/get-139", 5, 0, 0.0, 261.6, 251, 276, 263.0, 276.0, 276.0, 276.0, 0.4243041412084182, 0.30413988246775286, 1.035070063221317], "isController": false}, {"data": ["Click Profile/treatment/get-138", 5, 0, 0.0, 263.0, 252, 280, 264.0, 280.0, 280.0, 280.0, 0.423728813559322, 0.3037274894067796, 1.0336665783898304], "isController": false}, {"data": ["Launch/services.properties-52", 5, 0, 0.0, 253.0, 251, 254, 253.0, 254.0, 254.0, 254.0, 0.41753653444676414, 0.5618802192066806, 0.22630153966597077], "isController": false}, {"data": ["Login/css/images/FacebookLogo.png-87", 5, 0, 0.0, 254.2, 253, 256, 254.0, 256.0, 256.0, 256.0, 0.419639110365086, 0.5847900493075955, 0.2635038554343265], "isController": false}, {"data": ["Launch/css/images/Popular-item3.jpg-84", 5, 0, 0.0, 256.6, 254, 258, 257.0, 258.0, 258.0, 258.0, 0.41956868339347153, 10.808400682848033, 0.25731360661240243], "isController": false}, {"data": ["Click Pay Now/order/api/v1/carts/800075438-131", 5, 0, 0.0, 354.4, 345, 367, 352.0, 367.0, 367.0, 367.0, 0.4191114836546521, 0.25621463746856665, 0.3159707669740151], "isController": false}, {"data": ["Launch/css/images/Popular-item1.jpg-86", 5, 0, 0.0, 257.2, 253, 262, 257.0, 262.0, 262.0, 262.0, 0.419639110365086, 17.678117131766683, 0.2573567981535879], "isController": false}, {"data": ["Choose Item/catalog/api/v1/categories/all_data-103", 5, 0, 0.0, 788.0, 769, 807, 788.0, 807.0, 807.0, 807.0, 0.4039751151329078, 3.5151358113840185, 0.23670416902318817], "isController": false}, {"data": ["Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", 5, 0, 0.0, 26.4, 24, 30, 26.0, 30.0, 30.0, 30.0, 0.43200276481769484, 31.205449714878174, 0.27886115971142217], "isController": false}, {"data": ["Click Item/app/views/category-page.html-93", 5, 0, 0.0, 257.2, 252, 273, 253.0, 273.0, 273.0, 273.0, 0.42162071000927565, 0.475146776709672, 0.23469121553250696], "isController": false}, {"data": ["Launch/catalog/api/v1/categories-60", 5, 0, 0.0, 340.6, 339, 342, 341.0, 342.0, 342.0, 342.0, 0.414868901427149, 1.986346923747096, 0.23944093822602058], "isController": false}, {"data": ["Click Item/catalog/fetchImage-96", 5, 0, 0.0, 257.6, 256, 259, 257.0, 259.0, 259.0, 259.0, 0.42251140780801083, 22.46960228473044, 0.2607687595065067], "isController": false}, {"data": ["Click Item/catalog/fetchImage-95", 5, 0, 0.0, 257.0, 255, 259, 257.0, 259.0, 259.0, 259.0, 0.4224400135180804, 19.477702427973977, 0.26072469584319025], "isController": false}, {"data": ["Launch/css/images/Banner2.jpg-82", 5, 0, 0.0, 258.2, 256, 261, 258.0, 261.0, 261.0, 261.0, 0.41939271934239225, 35.01437730665995, 0.25474831194430464], "isController": false}, {"data": ["Launch/css/images/Banner1.jpg-81", 5, 0, 0.0, 275.0, 270, 279, 275.0, 279.0, 279.0, 279.0, 0.4190061174893153, 203.27566216060504, 0.25451348152183023], "isController": false}, {"data": ["Click Pay Now/offline/common/serviceworker.js-135", 5, 0, 0.0, 290.2, 281, 303, 285.0, 303.0, 303.0, 303.0, 0.4225471140032113, 0.9127677892334995, 0.28678734788303895], "isController": false}, {"data": ["Launch/css/images/Banner3.jpg-83", 5, 0, 0.0, 258.2, 255, 260, 259.0, 260.0, 260.0, 260.0, 0.41935754424222094, 28.198928148326765, 0.2547269458190053], "isController": false}, {"data": ["Choose Item/css/images/review_right.png-108", 5, 0, 0.0, 255.8, 252, 260, 255.0, 260.0, 260.0, 260.0, 0.42376472582422237, 0.6095756261123825, 0.2594731280193237], "isController": false}, {"data": ["Launch/css/main.min.css-42", 5, 0, 0.0, 262.0, 259, 265, 262.0, 265.0, 265.0, 265.0, 0.41704896154808574, 12.461129733505713, 0.2321463946117274], "isController": false}, {"data": ["Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", 5, 0, 0.0, 297.6, 289, 318, 292.0, 318.0, 318.0, 318.0, 0.42122999157540014, 0.422217249368155, 0.5405236415332773], "isController": false}, {"data": ["Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", 5, 0, 0.0, 66.2, 63, 70, 66.0, 70.0, 70.0, 70.0, 0.42925824175824173, 0.31230213877918955, 0.37057059151785715], "isController": false}, {"data": ["Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", 5, 0, 0.0, 1012.4, 1002, 1029, 1010.0, 1029.0, 1029.0, 1029.0, 0.39789909279006846, 0.6978777057138309, 0.34155595953366225], "isController": false}, {"data": ["Click Checkout/accountservice/ws/GetCountriesRequest-124", 5, 0, 0.0, 258.4, 257, 262, 258.0, 262.0, 262.0, 262.0, 0.42233296731142833, 2.0618427443196214, 0.47883649907086745], "isController": false}, {"data": ["Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", 5, 0, 0.0, 105.6, 89, 117, 107.0, 117.0, 117.0, 117.0, 0.4287796929937398, 0.27845556234456736, 0.3148850870422777], "isController": false}, {"data": ["Click Item/css/images/Filter.png-99", 5, 0, 0.0, 257.0, 252, 267, 257.0, 267.0, 267.0, 267.0, 0.42236864335191754, 0.7478069828095962, 0.2561434839077547], "isController": false}, {"data": ["Launch/css/images/arrow_right.png-66", 5, 0, 0.0, 254.0, 252, 256, 253.0, 256.0, 256.0, 256.0, 0.41855014230704835, 0.5689665996986439, 0.2624113196885987], "isController": false}, {"data": ["Click Checkout/css/images/Bell.png-123", 5, 0, 0.0, 253.4, 253, 254, 253.0, 254.0, 254.0, 254.0, 0.42251140780801083, 0.7084493039124556, 0.2620065858965692], "isController": false}, {"data": ["Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", 5, 0, 0.0, 270.4, 263, 291, 267.0, 291.0, 291.0, 291.0, 0.42233296731142833, 0.48378571353154826, 0.5757586155925332], "isController": false}, {"data": ["Launch/main.min.js-49", 5, 0, 0.0, 513.2, 511, 516, 513.0, 516.0, 516.0, 516.0, 0.4086636697997548, 107.349879955047, 0.21989617388639152], "isController": false}, {"data": ["Click Checkout/css/images/Shipex.png-127", 5, 0, 0.0, 254.2, 253, 257, 254.0, 257.0, 257.0, 257.0, 0.42261854450173275, 1.0681023370805511, 0.2562950352886485], "isController": false}, {"data": ["Click Checkout/order/api/v1/shippingcost/-120", 5, 0, 0.0, 280.2, 272, 289, 280.0, 289.0, 289.0, 289.0, 0.42140750105351876, 0.28231010324483774, 0.39712718605141173], "isController": false}, {"data": ["Launch/css/images/GoUp.png-77", 5, 0, 0.0, 253.8, 253, 254, 254.0, 254.0, 254.0, 254.0, 0.4192872117400419, 1.0285639412997902, 0.2534558438155136], "isController": false}, {"data": ["Click Item/catalog/fetchImage-98", 5, 0, 0.0, 261.4, 256, 278, 257.0, 278.0, 278.0, 278.0, 0.42258282623394183, 20.6890609153144, 0.260812838066261], "isController": false}, {"data": ["Click Item/catalog/fetchImage-102", 5, 0, 0.0, 259.6, 255, 263, 259.0, 263.0, 263.0, 263.0, 0.42236864335191754, 24.421074479430647, 0.26068064706876165], "isController": false}, {"data": ["Launch/catalog/fetchImage-67", 5, 0, 0.0, 259.2, 257, 261, 260.0, 261.0, 261.0, 261.0, 0.4183400267737617, 26.27134514620984, 0.25941984082161984], "isController": false}, {"data": ["Click Item/catalog/fetchImage-97", 5, 0, 0.0, 259.8, 257, 263, 260.0, 263.0, 263.0, 263.0, 0.4224757076468103, 29.784124815166876, 0.26074672581326575], "isController": false}, {"data": ["Click Item/catalog/fetchImage-101", 5, 0, 0.0, 260.2, 257, 263, 260.0, 263.0, 263.0, 263.0, 0.4222972972972973, 29.373993744721282, 0.26063661317567566], "isController": false}, {"data": ["Launch/catalog/fetchImage-68", 5, 0, 0.0, 257.6, 256, 259, 258.0, 259.0, 259.0, 259.0, 0.4183750313781273, 19.71943705024684, 0.2594415477784286], "isController": false}, {"data": ["Launch/catalog/fetchImage-69", 5, 0, 0.0, 259.4, 257, 260, 260.0, 260.0, 260.0, 260.0, 0.4183750313781273, 37.647052286419544, 0.25821583967868794], "isController": false}, {"data": ["Choose Item/catalog/api/v1/products/20-104", 5, 0, 0.0, 339.4, 334, 344, 339.0, 344.0, 344.0, 344.0, 0.41967433271781096, 0.4145103712019473, 0.24262422360248448], "isController": false}, {"data": ["Click Checkout/css/images/Check.png-125", 5, 0, 0.0, 255.2, 254, 259, 254.0, 259.0, 259.0, 259.0, 0.4224757076468103, 1.463399741233629, 0.26239702154626104], "isController": false}, {"data": ["Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", 5, 0, 0.0, 270.8, 267, 279, 270.0, 279.0, 279.0, 279.0, 0.42261854450173275, 0.5562551506635112, 1.2187427362437664], "isController": false}, {"data": ["Choose Item/treatment/get-106", 5, 0, 0.0, 1054.0, 1011, 1120, 1057.0, 1120.0, 1120.0, 1120.0, 0.3942906710827222, 0.28262632087374817, 0.9618536097310938], "isController": false}, {"data": ["Click Item/catalog/api/v1/categories/4/products-91", 5, 0, 0.0, 482.0, 475, 496, 477.0, 496.0, 496.0, 496.0, 0.41356492969396197, 0.9717160359801489, 0.24313094499586435], "isController": false}, {"data": ["Click Cart/css/images/SafePay.png-116", 5, 0, 0.0, 255.0, 252, 258, 255.0, 258.0, 258.0, 258.0, 0.4234775980350639, 2.087612221563479, 0.25722955661895486], "isController": false}, {"data": ["Launch/css/images/Down_arrow.svg-44", 5, 0, 0.0, 255.4, 252, 260, 254.0, 260.0, 260.0, 260.0, 0.4172229639519359, 0.48689593937750336, 0.25465268795894525], "isController": false}, {"data": ["Launch/css/images/Special-offer.jpg-75", 5, 0, 0.0, 257.4, 256, 259, 258.0, 259.0, 259.0, 259.0, 0.41921690282552193, 33.25364391192253, 0.25709786618596464], "isController": false}, {"data": ["Click Item/catalog/api/v1/categories/attributes-92", 5, 0, 0.0, 429.6, 423, 436, 429.0, 436.0, 436.0, 436.0, 0.41514447027565593, 0.3989278894055131, 0.24405954209564928], "isController": false}, {"data": ["Click Checkout/app/order/views/orderPayment-page.html-122", 5, 0, 0.0, 255.2, 254, 258, 254.0, 258.0, 258.0, 258.0, 0.4224757076468103, 0.566051436417406, 0.23929288128432613], "isController": false}, {"data": ["Launch/app/tempFiles/popularProducts.json-64", 5, 0, 0.0, 253.0, 252, 255, 253.0, 255.0, 255.0, 255.0, 0.4183750313781273, 0.3942694387498954, 0.24514161994812148], "isController": false}, {"data": ["Launch/catalog/fetchImage-70", 5, 0, 0.0, 268.6, 262, 280, 267.0, 280.0, 280.0, 280.0, 0.4186552792430712, 93.79464566063804, 0.2600241773423763], "isController": false}, {"data": ["Launch/css/images/Popular-item2.jpg-85", 5, 0, 0.0, 259.0, 256, 261, 261.0, 261.0, 261.0, 261.0, 0.41946308724832215, 11.669594169463087, 0.2572488464765101], "isController": false}, {"data": ["Launch/catalog/fetchImage-71", 5, 0, 0.0, 258.4, 256, 261, 258.0, 261.0, 261.0, 261.0, 0.41844505816386307, 24.737703599673612, 0.26071088584818813], "isController": false}, {"data": ["Login/accountservice/ws/AccountLoginRequest-89", 5, 0, 0.0, 335.6, 322, 347, 341.0, 347.0, 347.0, 347.0, 0.4174319585907497, 0.6290014766655535, 0.5083375511354149], "isController": false}, {"data": ["Click Checkout/css/images/User.jpg-126", 5, 0, 0.0, 256.2, 253, 260, 256.0, 260.0, 260.0, 260.0, 0.4224400135180804, 2.1831567886110173, 0.255361687859074], "isController": false}, {"data": ["Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", 5, 0, 0.0, 255.2, 254, 256, 255.0, 256.0, 256.0, 256.0, 0.41841004184100417, 10.396100287656905, 0.26763532949790797], "isController": false}, {"data": ["Click Logout/accountservice/ws/AccountLogoutRequest-141", 5, 0, 0.0, 346.4, 340, 364, 341.0, 364.0, 364.0, 364.0, 0.4219765381044814, 0.47546536100092834, 0.5167564245927926], "isController": false}, {"data": ["/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", 5, 0, 0.0, 257.8, 255, 260, 258.0, 260.0, 260.0, 260.0, 0.41715334556983147, 10.26710524257467, 0.2652019804355081], "isController": false}, {"data": ["Login/css/main.min.css-88", 5, 0, 0.0, 261.8, 258, 265, 263.0, 265.0, 265.0, 265.0, 0.4196038939241356, 12.537387362579725, 0.25897427828130243], "isController": false}, {"data": ["Choose Item/app/views/product-page.html-107", 5, 0, 0.0, 256.2, 254, 261, 255.0, 261.0, 261.0, 261.0, 0.4210880916287687, 1.1588146896580764, 0.23398351966481387], "isController": false}, {"data": ["Login/order/api/v1/carts/800075438-90", 5, 0, 0.0, 337.2, 325, 358, 326.0, 358.0, 358.0, 358.0, 0.41816509157815507, 0.25383927824705194, 0.2617615465835912], "isController": false}, {"data": ["Launch/-41", 5, 0, 0.0, 255.4, 254, 257, 256.0, 257.0, 257.0, 257.0, 0.41708375041708373, 1.3294544544544544, 0.27330390286119455], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 475, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
