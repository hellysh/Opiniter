function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = ['3M Company', 'A.O. Smith Corp', 'Abbott Laboratories', 'AbbVie Inc.', 'Accenture plc', 'Activision Blizzard', 'Acuity Brands Inc', 'Adobe Systems Inc', 'Advance Auto Parts', 'Advanced Micro Devices Inc', 'AES Corp', 'Aetna Inc', 'Affiliated Managers Group Inc', 'AFLAC Inc', 'Agilent Technologies Inc', 'Air Products & Chemicals Inc', 'Akamai Technologies Inc', 'Alaska Air Group Inc', 'Albemarle Corp', 'Alexandria Real Estate Equities Inc', 'Alexion Pharmaceuticals', 'Align Technology', 'Allegion', 'Allergan', 'Alliance Data Systems', 'Alliant Energy Corp', 'Allstate Corp', 'Alphabet Inc Class A', 'Alphabet Inc Class C', 'Altria Group Inc', 'Amazon.com Inc.', 'Ameren Corp', 'American Airlines Group', 'American Electric Power', 'American Express Co', 'American International Group', 'American Tower Corp A', 'American Water Works Company Inc', 'Ameriprise Financial', 'AmerisourceBergen Corp', 'AMETEK Inc.', 'Amgen Inc.', 'Amphenol Corp', 'Anadarko Petroleum Corp', 'Analog Devices', 'Andeavor', 'ANSYS', 'Anthem Inc.', 'Aon plc', 'Apache Corporation', 'Apartment Investment & Management', 'Apple Inc.', 'Applied Materials Inc.', 'Aptiv Plc', 'Archer-Daniels-Midland Co', 'Arconic Inc.', 'Arthur J. Gallagher & Co.', 'Assurant Inc.', 'AT&T Inc.', 'Autodesk Inc.', 'Automatic Data Processing', 'AutoZone Inc', 'AvalonBay Communities', 'Avery Dennison Corp', 'Baker Hughes', 'Ball Corp', 'Bank of America Corp', 'Baxter International Inc.', 'BB&T Corporation', 'Becton Dickinson', 'Berkshire Hathaway', 'Best Buy Co. Inc.', 'Biogen Inc.', 'BlackRock', 'Block H&R', 'Boeing Company', 'Booking Holdings Inc', 'BorgWarner', 'Boston Properties', 'Boston Scientific', 'Brighthouse Financial Inc', 'Bristol-Myers Squibb', 'Broadcom', 'Brown-Forman Corp.', 'C. H. Robinson Worldwide', 'CA', 'Cabot Oil & Gas', 'Cadence Design Systems', 'Campbell Soup', 'Capital One Financial', 'Cardinal Health Inc.', 'Carmax Inc', 'Carnival Corp.', 'Caterpillar Inc.', 'Cboe Global Markets', 'CBRE Group', 'CBS Corp.', 'Celgene Corp.', 'Centene Corporation', 'CenterPoint Energy', 'CenturyLink Inc', 'Cerner', 'CF Industries Holdings Inc', 'Charles Schwab Corporation', 'Charter Communications', 'Chevron Corp.', 'Chipotle Mexican Grill', 'Chubb Limited', 'Church & Dwight', 'CIGNA Corp.', 'Cimarex Energy', 'Cincinnati Financial', 'Cintas Corporation', 'Cisco Systems', 'Citigroup Inc.', 'Citizens Financial Group', 'Citrix Systems', 'CME Group Inc.', 'CMS Energy', 'Coca-Cola Company (The)', 'Cognizant Technology Solutions', 'Colgate-Palmolive', 'Comcast Corp.', 'Comerica Inc.', 'Conagra Brands', 'Concho Resources', 'ConocoPhillips', 'Consolidated Edison', 'Constellation Brands', 'Corning Inc.', 'Costco Wholesale Corp.', '"Coty', 'Crown Castle International Corp.', 'CSRA Inc.', 'CSX Corp.', 'Cummins Inc.', 'CVS Health', 'D. R. Horton', 'Danaher Corp.', 'Darden Restaurants', 'DaVita Inc.', 'Deere & Co.', 'Delta Air Lines Inc.', 'Dentsply Sirona', 'Devon Energy Corp.', 'Digital Realty Trust Inc', 'Discover Financial Services', 'Discovery Inc. Class A', 'Discovery Inc. Class C', 'Dish Network', 'Dollar General', 'Dollar Tree', 'Dominion Energy', 'Dover Corp.', 'DowDuPont', 'Dr Pepper Snapple Group', 'DTE Energy Co.', 'Duke Energy', 'Duke Realty Corp', 'DXC Technology', 'E*Trade', 'Eastman Chemical', 'Eaton Corporation', 'eBay Inc.', 'Ecolab Inc.', "Edison Int'l", 'Edwards Lifesciences', 'Electronic Arts', 'Emerson Electric Company', 'Entergy Corp.', 'Envision Healthcare', 'EOG Resources', 'EQT Corporation', 'Equifax Inc.', 'Equinix', 'Equity Residential', 'Essex Property Trust', 'Estee Lauder Cos.', 'Everest Re Group Ltd.', 'Eversource Energy', 'Exelon Corp.', 'Expedia Inc.', 'Expeditors International', 'Express Scripts', 'Extra Space Storage', 'Exxon Mobil Corp.', 'F5 Networks', 'Facebook', 'Fastenal Co', 'Federal Realty Investment Trust', 'FedEx Corporation', 'Fidelity National Information Services', 'Fifth Third Bancorp', 'FirstEnergy Corp', 'Fiserv Inc', 'FLIR Systems', 'Flowserve Corporation', 'Fluor Corp.', 'FMC Corporation', 'Foot Locker Inc', 'Ford Motor', 'Fortive Corp', 'Fortune Brands Home & Security', 'Franklin Resources', 'Freeport-McMoRan Inc.', 'Gap Inc.', 'Garmin Ltd.', 'Gartner Inc', 'General Dynamics', 'General Electric', 'General Growth Properties Inc.', 'General Mills', 'General Motors', 'Genuine Parts', 'Gilead Sciences', 'Global Payments Inc.', 'Goldman Sachs Group', 'Goodyear Tire & Rubber', 'Grainger (W.W.) Inc.', 'Halliburton Co.', 'Hanesbrands Inc', 'Harley-Davidson', 'Harris Corporation', 'Hartford Financial Svc.Gp.', 'Hasbro Inc.', 'HCA Holdings', 'HCP Inc.', 'Helmerich & Payne', 'Henry Schein', 'Hess Corporation', 'Hewlett Packard Enterprise', 'Hilton Worldwide Holdings Inc', 'Hologic', 'Home Depot', "Honeywell Int'l Inc.", 'Hormel Foods Corp.', 'Host Hotels & Resorts', 'HP Inc.', 'Humana Inc.', 'Huntington Bancshares', 'Huntington Ingalls Industries', 'IDEXX Laboratories', 'IHS Markit Ltd.', 'Illinois Tool Works', 'Illumina Inc', 'Incyte', 'Ingersoll-Rand PLC', 'Intel Corp.', 'Intercontinental Exchange', 'International Business Machines', 'International Paper', 'Interpublic Group', 'Intl Flavors & Fragrances', 'Intuit Inc.', 'Intuitive Surgical Inc.', 'Invesco Ltd.', 'IPG Photonics Corp.', 'IQVIA Holdings Inc.', 'Iron Mountain Incorporated', 'J. B. Hunt Transport Services', 'Jacobs Engineering Group', 'JM Smucker', 'Johnson & Johnson', 'Johnson Controls International', 'JPMorgan Chase & Co.', 'Juniper Networks', 'Kansas City Southern', 'Kellogg Co.', 'KeyCorp', 'Kimberly-Clark', 'Kimco Realty', 'Kinder Morgan', 'KLA-Tencor Corp.', "Kohl's Corp.", 'Kraft Heinz Co', 'Kroger Co.', 'L Brands Inc.', 'L-3 Communications Holdings', 'Laboratory Corp. of America Holding', 'Lam Research', 'Leggett & Platt', 'Lennar Corp.', 'Leucadia National Corp.', 'Lilly (Eli) & Co.', 'Lincoln National', 'LKQ Corporation', 'Lockheed Martin Corp.', 'Loews Corp.', "Lowe's Cos.", 'LyondellBasell', 'M&T Bank Corp.', 'Macerich', "Macy's Inc.", 'Marathon Oil Corp.', 'Marathon Petroleum', "Marriott Int'l.", 'Marsh & McLennan', 'Martin Marietta Materials', 'Masco Corp.', 'Mastercard Inc.', 'Mattel Inc.', 'McCormick & Co.', "McDonald's Corp.", 'McKesson Corp.', 'Medtronic plc', 'Merck & Co.', 'MetLife Inc.', 'Mettler Toledo', 'MGM Resorts International', 'Michael Kors Holdings', 'Microchip Technology', 'Micron Technology', 'Microsoft Corp.', 'Mid-America Apartments', 'Mohawk Industries', 'Molson Coors Brewing Company', 'Mondelez International', 'Monsanto Co.', 'Monster Beverage', "Moody's Corp", 'Morgan Stanley', 'Motorola Solutions Inc.', 'Mylan N.V.', 'Nasdaq', 'National Oilwell Varco Inc.', 'Navient', 'Nektar Therapeutics', 'NetApp', 'Netflix Inc.', 'Newell Brands', 'Newfield Exploration Co', 'Newmont Mining Corporation', 'News Corp. Class A', 'News Corp. Class B', 'NextEra Energy', 'Nielsen Holdings', 'Nike', 'NiSource Inc.', 'Noble Energy Inc', 'Nordstrom', 'Norfolk Southern Corp.', 'Northern Trust Corp.', 'Northrop Grumman Corp.', 'Norwegian Cruise Line', 'NRG Energy', 'Nucor Corp.', 'Nvidia Corporation', "O'Reilly Automotive", 'Occidental Petroleum', 'Omnicom Group', 'ONEOK', 'Oracle Corp.', 'PACCAR Inc.', 'Packaging Corporation of America', 'Parker-Hannifin', 'Paychex Inc.', 'PayPal', 'Pentair Ltd.', "People's United Financial", 'PepsiCo Inc.', 'PerkinElmer', 'Perrigo', 'Pfizer Inc.', 'PG&E Corp.', 'Philip Morris International', 'Phillips 66', 'Pinnacle West Capital', 'Pioneer Natural Resources', 'PNC Financial Services', 'Polo Ralph Lauren Corp.', 'PPG Industries', 'PPL Corp.', 'Praxair Inc.', 'Principal Financial Group', 'Procter & Gamble', 'Progressive Corp.', 'Prologis', 'Prudential Financial', 'Public Serv. Enterprise Inc.', 'Public Storage', 'Pulte Homes Inc.', 'PVH Corp.', 'Qorvo', 'QUALCOMM Inc.', 'Quanta Services Inc.', 'Quest Diagnostics', 'Range Resources Corp.', 'Raymond James Financial Inc.', 'Raytheon Co.', 'Realty Income Corporation', 'Red Hat Inc.', 'Regency Centers Corporation', 'Regeneron', 'Regions Financial Corp.', 'Republic Services Inc', 'ResMed', 'Robert Half International', 'Rockwell Automation Inc.', 'Rockwell Collins', 'Roper Technologies', 'Ross Stores', 'Royal Caribbean Cruises Ltd', 'S&P Global', 'Salesforce.com', 'SBA Communications', 'SCANA Corp', 'Schlumberger Ltd.', 'Seagate Technology', 'Sealed Air', 'Sempra Energy', 'Sherwin-Williams', 'Simon Property Group Inc', 'Skyworks Solutions', 'SL Green Realty', 'Snap-On Inc.', 'Southern Co.', 'Southwest Airlines', 'Stanley Black & Decker', 'Starbucks Corp.', 'State Street Corp.', 'Stericycle Inc', 'Stryker Corp.', 'SunTrust Banks', 'SVB Financial', 'Symantec Corp.', 'Synchrony Financial', 'Synopsys Inc.', 'Sysco Corp.', 'T. Rowe Price Group', 'Take-Two Interactive', 'Tapestry', 'Target Corp.', 'TE Connectivity Ltd.', 'TechnipFMC', 'Texas Instruments', 'Textron Inc.', 'The Bank of New York Mellon Corp.', 'The Clorox Company', 'The Cooper Companies', 'The Hershey Company', 'The Mosaic Company', 'The Travelers Companies Inc.', 'The Walt Disney Company', 'Thermo Fisher Scientific', 'Tiffany & Co.', 'Time Warner Inc.', 'TJX Companies Inc.', 'Torchmark Corp.', 'Total System Services', 'Tractor Supply Company', 'TransDigm Group', 'TripAdvisor', 'Twenty-First Century Fox Class A', 'Twenty-First Century Fox Class B', 'Tyson Foods', 'U.S. Bancorp', 'UDR Inc', 'Ulta Beauty', 'Under Armour Class A', 'Under Armour Class C', 'Union Pacific', 'United Continental Holdings', 'United Health Group Inc.', 'United Parcel Service', 'United Rentals', 'United Technologies', 'Universal Health Services', 'Unum Group', 'V.F. Corp.', 'Valero Energy', 'Varian Medical Systems', 'Ventas Inc', 'Verisign Inc.', 'Verisk Analytics', 'Verizon Communications', 'Vertex Pharmaceuticals Inc', 'Viacom Inc.', 'Visa Inc.', 'Vornado Realty Trust', 'Vulcan Materials', 'Wal-Mart Stores', 'Walgreens Boots Alliance', 'Waste Management Inc.', 'Waters Corporation', 'Wec Energy Group Inc', 'Wells Fargo', 'Welltower Inc.', 'Western Digital', 'Western Union Co', 'WestRock Company', 'Weyerhaeuser Corp.', 'Whirlpool Corp.', 'Williams Cos.', 'Willis Towers Watson', 'Wyndham Worldwide', 'Wynn Resorts Ltd', 'Xcel Energy Inc', 'Xerox Corp.', 'Xilinx Inc', 'XL Capital', 'Xylem Inc.', 'Yum! Brands Inc', 'Zimmer Biomet Holdings', 'Zions Bancorp', 'Zoetis']
/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), countries);