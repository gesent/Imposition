var scaleFactor =0.354166666667;
var dpi = 96;
var elementTrack = 0;
let CompileData = {};
let allItems = [];
let usedColors = new Set(); 
let GlobalX = 0, GlobalY = 0, GlobalCurrentX = 0, GlobalCurrentY = 0, GlobalItemHight = 0, GlobalItemWith = 0 ;
let MainSheet = {
    MainHeight: 0,
    MainWidth: 0,
    MainHeightScaled: 0,
    MainWidthScaled: 0,
    TotalSheets: 0,
    Selected: "",
    MainSq: 0

};

function getRandomColor() {
    let color;
    do {
        color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

        // Convert the color to RGB values
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        // Check if the color is too close to black or gray
        const isGray = (Math.abs(r - g) < 30) && (Math.abs(g - b) < 30) && (Math.abs(b - r) < 30);
        const isBlack = (r < 50) && (g < 50) && (b < 50);

        if (!isGray && !isBlack && !usedColors.has(color)) {
            usedColors.add(color); // Mark this color as used
            break;
        }
    } while (true);
    
    return color;
}

window.onload = function()
{
     document.getElementById('PS').getElementsByTagName('option')[0].selected = 'selected'};
    
document.getElementById('PS').addEventListener('change', function() {
    var selectedValue = this.value;


    if (selectedValue !== 'null') {

        try{
            document.getElementById("imCanvas").remove();}
        catch(error){}

        const imCanvas = document.createElement("canvas");
        imCanvas.id = 'imCanvas';

        let tempMainSheet =  selectedValue.split('x');

        MainSheet.Selected = selectedValue;
        MainSheet.MainHeight = tempMainSheet[0];
        MainSheet.MainWidth = tempMainSheet[1];
        MainSheet.MainHeightScaled = (MainSheet.MainHeight * dpi) * scaleFactor;
        MainSheet.MainWidthScaled = (MainSheet.MainWidth * dpi) * scaleFactor;
        MainSheet.MainSq = MainSheet.MainHeightScaled * MainSheet.MainWidthScaled;

        imCanvas.height = MainSheet.MainHeightScaled;
        imCanvas.width = MainSheet.MainWidthScaled;

        const container = document.getElementById('imposition');
        container.appendChild(imCanvas);
    } else {
        try{
                document.getElementById("imCanvas").remove();
                document.getElementById("itemSize").replaceChildren(); 
            }
        catch(error){}
    }
}); 

document.getElementById('addNew').addEventListener('click', function() {
    elementTrack++;
                // Create the main div
                const div = document.createElement('div');
                div.name = 'item'+elementTrack;
                div.id = 'item'+elementTrack;
                div.className = 'Item';
    
                // Create the label for Item Size
                const label1 = document.createElement('label');
                label1.htmlFor = 'dItem'+elementTrack;
                label1.textContent = 'Item Size';
                div.appendChild(label1);
    
                // Create a line break
                div.appendChild(document.createElement('br'));
    
                // Create the select element
                const select = document.createElement('select');
                select.name = 'dItem'+elementTrack;
                select.id = 'dItem'+elementTrack;
                select.className = 'ItemSize';
    
                // Define the options
                const options = [
                    { value: 'null', text: '', selected: true },
                    { value: '8.25x21.75', text: '8.25 x 21.75'},
                    { value: '10.75x16.75', text: '10.75 x 16.75' },
                    { value: '6x11', text: '6 x 11' },
                    { value: '7.5x18', text: '7.5 x 18' },
                    { value: '6x9', text: '6 x 9' },
                    { value: '4x6', text: '4 x 6' },
                    { value: '8.5x5.5', text: '8.5 x 5.5' },
                    { value: '8.25x10.75', text: '8.25 x 10.75' },
                    { value: '8.25x26', text: '8.25 x 26' },
                ];
    
                // Add options to the select element
                options.forEach(optionData => {
                    const option = document.createElement('option');
                    option.value = optionData.value;
                    option.textContent = optionData.text;
                    if (optionData.selected) {
                        option.selected = true;
                    }
                    select.appendChild(option);
                });
                div.appendChild(select);
    
                // Create the label for Quantity
                const label2 = document.createElement('label');
                label2.htmlFor = 'qwt'+elementTrack;
                label2.textContent = 'Quantity';
                div.appendChild(label2);
    
                // Create the input element for quantity
                const input = document.createElement('input');
                input.type = 'text';
                input.id = 'qwt'+elementTrack;
                input.name = 'qwt'+elementTrack;
                div.appendChild(input);
    
                // Add two line breaks
                div.appendChild(document.createElement('br'));
                div.appendChild(document.createElement('br'));
    
                // Append the created div to the container
                const container = document.getElementById('itemSize');
                container.appendChild(div);
    
                // Add a line break after the div
                container.appendChild(document.createElement('br'));

                var selectedValue = this.value;
                const items = document.querySelectorAll('.ItemSize');
                items.forEach(item => {
                    item.addEventListener('change', function() {
                            var selectedValue = this.value;

                            if (selectedValue == 'null') 
                                {
                           
                                    try
                                    {
                                        //ADD REMOVAL OF THE CANVAS HERE TOO
                                        document.getElementById(item.parentNode.id).remove();
                                    }
                                    catch(error){}
                                }
                    });
                });
});

function FieldCheck(items) {
    let allFilled = true;

    items.forEach((item) => {
        const select = item.querySelector('select');
        const input = item.querySelector('input[type="text"]');

        let fieldFilled = true;

        if (!select.value || select.value === 'null') {
            fieldFilled = false;
            // Highlight the select field if not filled
            select.classList.add('highlight');
        } else {
            // Remove the highlight if the field is filled
            select.classList.remove('highlight');
        }

        if (!input.value.trim()) {
            fieldFilled = false;
            // Highlight the input field if not filled
            input.classList.add('highlight');
        } else {
            // Remove the highlight if the field is filled
            input.classList.remove('highlight');
        }

        if (!fieldFilled) {
            allFilled = false;
        }
    });

    if (!allFilled) {
        alert("You have forgotten something");
        return false;
    } else {
        return true;
    }
}


document.getElementById('calc').addEventListener('click', function() {

    CompileData = {};
    allItems = [];
    usedColors = new Set(); 
    GlobalX = 0;
    GlobalY = 0;
    const items = document.querySelectorAll('#itemSize .Item');
   
   if (!FieldCheck(items)) {
    event.preventDefault(); // Stop form submission or any further action
    return; // Exit the function early if fields are not filled
}
   // Loop through each item to extract data
   
   items.forEach(item => {
        
       var itemSize = item.querySelector('select.ItemSize').value.split('x');
       
       // Use itemId as the key in the CompileData object
       CompileData[item.id] = {
           Size: item.querySelector('select.ItemSize').value,           
           Height: parseFloat(itemSize[0]) * dpi * scaleFactor, // Store the selected size
           Width: parseFloat(itemSize[1]) * dpi * scaleFactor,
           Quantity: parseInt(item.querySelector('input[type="text"]').value), // Store the quantity
           PerSheetQuantity: 0,
           Square: (parseFloat(itemSize[0]) * dpi * scaleFactor) * (parseFloat(itemSize[1]) * dpi * scaleFactor),
           Color: getRandomColor() // Assign a unique random color
       };
   });

   CalcPerPage(CompileData);
});

function CalcPerPage(CompileData)
{
   
    var ItemsTotalSq = 0, tempId = null;

    for (let itemId in CompileData) {
        if (CompileData.hasOwnProperty(itemId)) {

            if(CompileData[itemId] != tempId)
                { 
                    ItemsTotalSq = ItemsTotalSq + (CompileData[itemId].Height * CompileData[itemId].Width);
                    tempId = CompileData[itemId];
                } 
            document.getElementById(itemId).style.backgroundColor = CompileData[itemId].Color;
        }
    }
console.log(ItemsTotalSq + " " + MainSheet.MainSq);
    if(ItemsTotalSq > MainSheet.MainSq)
        {
            alert("Don't be greedy. It won't fit")
        }
    else
        {
          // First, calculate total area of all items combined
            let combinedArea = 0;
            
            for (const key in CompileData) 
            {
                const item = CompileData[key];
                combinedArea += item.Square * item.Quantity;
            }

            // Calculate how many full sheets are required based on the combined area
            let totalSheets = (combinedArea / MainSheet.MainSq) + 1;

            // Distribute the space on each sheet proportionally
            for (const key in CompileData) {
                const item = CompileData[key];
            
                // Calculate the proportion of total area occupied by this item
                const itemArea = item.Square * item.Quantity;
                const proportion = itemArea / combinedArea;
            
                // Calculate the space this item should occupy on a single sheet
                const areaPerSheet = MainSheet.MainSq * proportion;
            
                // Calculate how many copies of this item can fit on a single sheet
                const fitLandscape = Math.floor(MainSheet.MainWidthScaled / item.Width) * Math.floor(MainSheet.MainHeightScaled / item.Height);
                const fitPortrait = Math.floor(MainSheet.MainWidthScaled / item.Height) * Math.floor(MainSheet.MainHeightScaled / item.Width);
            
                // Choose the best fit and ensure a minimum of 1
                const perSheetQuantity = Math.max(1, Math.min(Math.floor(areaPerSheet / item.Square), Math.max(fitLandscape, fitPortrait)));
            
                // Update PerSheetQuantity
                item.PerSheetQuantity = perSheetQuantity;
            }
            var iid =1;
            //    console.log(CompileData);

            for (const key in CompileData) {
                const item = CompileData[key];
        
                for (let i = 0; i < item.PerSheetQuantity; i++) {
                    allItems.push({
                        id: iid++,
                        GroupId: key,
                        Size: item.Size,
                        Height: item.Height,
                        Width: item.Width,
                        Color: item.Color,
                        Square: item.Square,
                        Quantity: item.Quantity,
                    });
                }
            }
console.log(allItems);
            allItems.sort((a, b) => b.Square - a.Square);

            // Update the global object with the total number of sheets
             MainSheet.TotalSheets = Math.ceil(totalSheets);
             const AllItemsCombined = combineItems(allItems);
  
            
            //ImposeVisual(allItems, MainSheet.MainWidthScaled, MainSheet.MainHeightScaled, AllItemsCombined);
           const counts =  ImposeVisual(AllItemsCombined,  MainSheet.MainWidthScaled, MainSheet.MainHeightScaled);
            console.log(counts);
        }
}

function combineItems(allItems) {
    const combinedItems = {};
    let iid = 0;

    for (const item of allItems) {
        // Create a unique key based on Size, Height, and Width
        const combinedKey = `${item.Size}`;

        // If this combination already exists, update the CombinedQuantity
        if (combinedItems[combinedKey]) 
            {
                combinedItems[combinedKey].CombinedQuantity += 1; // Increment the combined quantity
            } 
        else {
                // If it doesn't exist, create a new entry in combinedItems
                combinedItems[combinedKey] = {
                id: iid++,
                GroupId: item.GroupId,
                Size: item.Size,
                Height: item.Height,
                Width: item.Width,
                Color: item.Color,
                CombinedQuantity: 1, // Start with 1 since this is the first instance
            };
        }
    }


    // Convert the combinedItems object into an array of objects
    const newAllItems = Object.values(combinedItems);

    for (const item of newAllItems) 
        {
            if (item.CombinedQuantity % 2 !== 0 && item.CombinedQuantity != 1 && newAllItems.length > 1) 
                {
                    item.CombinedQuantity = item.CombinedQuantity -1;
                }
        }
    return newAllItems;
}


function ImposeVisual(allItems, sheetWidth, sheetHeight) {
    const canvas = document.getElementById("imCanvas");
    const ctx = canvas.getContext("2d");

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let freeRectangles = [{ x: 0, y: 0, width: sheetWidth, height: sheetHeight }];
    let orientationMap = new Map();  // Track the orientation for each item size

    // Keep track of how many items of each GroupId are placed
    const placedItemsCount = {};

    // Group items by GroupId and manage their placement
    const groupCounts = allItems.reduce((acc, item) => {
        acc[item.GroupId] = (acc[item.GroupId] || 0) + item.CombinedQuantity;
        placedItemsCount[item.GroupId] = 0;  // Initialize counter for each GroupId
        return acc;
    }, {});

    allItems.forEach(item => {
        let remainingQuantity = item.CombinedQuantity;

        // Determine best orientation (portrait or landscape) for this size
        let bestOrientation = calculateBestOrientation(item, freeRectangles);
        orientationMap.set(item.Size, bestOrientation);  // Set orientation for all items of this size

        while (remainingQuantity > 0 && freeRectangles.length > 0) {
            let placed = false;

            // Sort free rectangles by area (largest first)
            freeRectangles.sort((a, b) => (b.width * b.height) - (a.width * a.height));

            for (let i = 0; i < freeRectangles.length; i++) {
                const rect = freeRectangles[i];

                const rotated = orientationMap.get(item.Size);
                const width = rotated ? item.Height : item.Width;
                const height = rotated ? item.Width : item.Height;

                // Check if the item fits in the current rectangle
                if (width <= rect.width && height <= rect.height) {
                    // Place the item
                    placeItem(ctx, item, rect.x, rect.y, rotated, width, height);

                    // Update free rectangles after placement
                    freeRectangles = splitFreeRectangles(freeRectangles, rect, width, height, rect.x, rect.y);

                    placed = true;
                    remainingQuantity--;
                    groupCounts[item.GroupId]--;

                    // Increment the placed count for this GroupId
                    placedItemsCount[item.GroupId]++;

                    break;  // Exit the loop after placing the item
                }
            }

            if (!placed) {
                break;  // If no item was placed, exit the loop
            }
        }
    });

    // Return the array with the count of placed items for each GroupId
    return Object.entries(placedItemsCount).map(([groupId, count]) => ({
        GroupId: groupId,
        PlacedCount: count
    }));

    function calculateBestOrientation(item, freeRectangles) {
        let portraitFits = 0, landscapeFits = 0;

        freeRectangles.forEach(rect => {
            // Calculate how many times the item can fit in portrait orientation
            if (item.Width <= rect.width && item.Height <= rect.height) {
                portraitFits += Math.floor(rect.width / item.Width) * Math.floor(rect.height / item.Height);
            }
            // Calculate how many times the item can fit in landscape orientation
            if (item.Height <= rect.width && item.Width <= rect.height) {
                landscapeFits += Math.floor(rect.width / item.Height) * Math.floor(rect.height / item.Width);
            }
        });

        // Choose the orientation that fits more items
        return landscapeFits >= portraitFits;
    }

    function placeItem(ctx, item, x, y, rotated, width, height) {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = item.Color;
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "black";
        let fontSize = Math.min(width, height) * 0.15;
        ctx.font = `${fontSize}px Arial`;
        //ctx.font = `${Math.min(width, height) * 0.2}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.Size, x + width / 2, y + height / 2);
    }

    function splitFreeRectangles(freeRectangles, usedRect, width, height, posX, posY) {
        let newFreeRectangles = [];

        freeRectangles.forEach(rect => {
            // If the used space is inside the current rectangle, create new available spaces
            if (!(posX >= rect.x + rect.width || posX + width <= rect.x || posY >= rect.y + rect.height || posY + height <= rect.y)) {
                // Space to the right of the placed item
                if (posX + width < rect.x + rect.width) {
                    newFreeRectangles.push({
                        x: posX + width,
                        y: rect.y,
                        width: rect.x + rect.width - (posX + width),
                        height: rect.height
                    });
                }
                // Space below the placed item
                if (posY + height < rect.y + rect.height) {
                    newFreeRectangles.push({
                        x: rect.x,
                        y: posY + height,
                        width: rect.width,
                        height: rect.y + rect.height - (posY + height)
                    });
                }
            } else {
                // If not affected, retain the existing rectangle
                newFreeRectangles.push(rect);
            }
        });

        return newFreeRectangles;
    }
}

