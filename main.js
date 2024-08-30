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
                        StartX: 0,
                        StartY: 0
                    });
                }
            }

            allItems.sort((a, b) => b.Square - a.Square);

            // Update the global object with the total number of sheets
             MainSheet.TotalSheets = Math.ceil(totalSheets);
             const AllItemsCombined = combineItems(allItems);
  
            console.log(allItems);
            //ImposeVisual(allItems, MainSheet.MainWidthScaled, MainSheet.MainHeightScaled, AllItemsCombined);
            ImposeVisual(allItems,  MainSheet.MainWidthScaled, MainSheet.MainHeightScaled,);
        }
}

function calculateFit(availableSpace, itemSize, itemCount) {
    let fitCount = 0;
    while (availableSpace >= itemSize && itemCount > 0) {
        availableSpace -= itemSize;
        fitCount++;
        itemCount--;
    }

    return fitCount;
}

function DirectionRotationChoice(combinedItems) {
    let largestEvenValue = -1;
    let largestEvenKey = null;
    
    let ItemTest = {
        XNoR: 0, 
        XR: 0, 
        YNoR: 0, 
        YR: 0,
    };

    const initialAvailableX = MainSheet.MainWidthScaled;
    const initialAvailableY = MainSheet.MainHeightScaled;
    let items = combinedItems.CombinedQuantity;

    // Fit items without rotation in X direction
    ItemTest.XNoR = calculateFit(initialAvailableX, combinedItems.Width, items);

    // Fit items with rotation in X direction
    ItemTest.XR = calculateFit(initialAvailableX, combinedItems.Height, items);

    // Fit items without rotation in Y direction
    ItemTest.YNoR = calculateFit(initialAvailableY, combinedItems.Width, items);

    // Fit items with rotation in Y direction
    ItemTest.YR = calculateFit(initialAvailableY, combinedItems.Width, items);
    
    for (const key in ItemTest) {
        const value = ItemTest[key];

        // Check if the value is an even number
        if (value % 2 === 0 && value > largestEvenValue) {
            largestEvenValue = value;
            largestEvenKey = key;
        }
        else if (value > largestEvenValue)
        {
            largestEvenValue = value -1;
            largestEvenKey = key;
        }
    }
return largestEvenKey;
}

function combineItems(allItems) {
    const combinedItems = {};
    let iid = 0;

    for (const item of allItems) {
        // Create a unique key based on Size, Height, and Width
        const combinedKey = `${item.Size}`;

        // If this combination already exists, update the CombinedQuantity
        if (combinedItems[combinedKey]) {
            combinedItems[combinedKey].CombinedQuantity += 1; // Increment the combined quantity
        } else {
            // If it doesn't exist, create a new entry in combinedItems
            combinedItems[combinedKey] = {
                id: iid++,
                Size: item.Size,
                Height: item.Height,
                Width: item.Width,
                CombinedQuantity: 1, // Start with 1 since this is the first instance
            };
        }
    }

    // Convert the combinedItems object into an array of objects
    const newAllItems = Object.values(combinedItems);

    return newAllItems;
}

/*function ImposeVisual(allItems, sheetWidth, sheetHeight, AllItemsCombined) {
    const c = document.getElementById("imCanvas");
    const ctx = c.getContext("2d");

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, c.width, c.height);

    const remainingItems = [];
    
    let currentX = 0, currentY = 0;
    let currentDirection = null;
    let rowHeight = 0;

    // Determine the initial direction and rotation based on the first item in AllItemsCombined
    for (const key in AllItemsCombined) {
        currentDirection = DirectionRotationChoice(AllItemsCombined[key]);
        break;
    }

    allItems.forEach((item, index) => {
        let itemFits = true;

        // Determine where to place the item based on currentDirection
        if (currentDirection === "XNoR") 
            {
                item.StartX = currentX;
                item.StartY = currentY;
                rowHeight = Math.max(rowHeight, item.Height);
                currentX += item.Width;
            } 
        else if (currentDirection === "XR") 
            {
                item.StartX = currentX;
                item.StartY = currentY;
                [item.Width, item.Height] = [item.Height, item.Width];
                rowHeight = Math.max(rowHeight, item.Height);
                currentX += item.Width;
            } 
        else if (currentDirection === "YNoR") 
            {
                item.StartX = currentX;
                item.StartY = currentY;
                currentY += item.Height;
            } 
        else if (currentDirection === "YR") 
            {
                item.StartX = currentX;
                item.StartY = currentY;
                [item.Width, item.Height] = [item.Height, item.Width];
                currentY += item.Height;
            }

        // Check if the item fits on the canvas
        if (item.StartX + item.Width > sheetWidth || item.StartY + item.Height > sheetHeight) {
            // Move to a new row/column based on the direction
            if (currentDirection === "XNoR" || currentDirection === "XR") {
                currentX = 0;
                currentY += rowHeight;
                rowHeight = 0;
            } else {
                currentY = 0;
                currentX += item.Width;
            }

            // Reset the item position after moving to a new row/column
            item.StartX = currentX;
            item.StartY = currentY;

            // Check if the item fits now
            if (item.StartX + item.Width > sheetWidth || item.StartY + item.Height > sheetHeight) {
                itemFits = false;
            } else {
                if (currentDirection === "XNoR" || currentDirection === "XR") {
                    currentX += item.Width;
                } else {
                    currentY += item.Height;
                }
            }
        }

        // Draw the item if it fits
        if (itemFits) {
            ctx.beginPath();
            ctx.rect(item.StartX, item.StartY, item.Width, item.Height);

            // Set the fill color based on the item's color property
            ctx.fillStyle = item.Color;
            ctx.fill();

            ctx.stroke(); // Draw the border of the rectangle

            // Calculate the font size as 5% of the rectangle's smaller dimension (Width or Height)
            const fontSize = Math.min(item.Width, item.Height) * 0.15;
            ctx.font = `${fontSize}px Arial`;

            // Calculate the position to center the text in the rectangle
            const textWidth = ctx.measureText(item.Size).width;
            const textX = item.StartX + (item.Width - textWidth) / 2;
            const textY = item.StartY + (item.Height + fontSize) / 2;

            // Set the text color and draw the label centered in the rectangle
            ctx.fillStyle = "black";
            ctx.fillText(item.Size, textX, textY);

        } else {
            // If the item does not fit, add it to the remainingItems array
            remainingItems.push(item);
        }
    });

    allItems.length = 0; // Clear the original array
    allItems.push(...remainingItems); // Add the remaining items back to the array
}



function findWhiteSpaceBlocks(canvasId) {
    const c = document.getElementById(canvasId);
    const ctx = c.getContext("2d");
    const width = c.width;
    const height = c.height;

    const whiteSpaceBlocks = [];
    const imgData = ctx.getImageData(0, 0, width, height).data;

    // Create a 2D array to track visited pixels
    const visited = Array.from({ length: height }, () => Array(width).fill(false));

    // Helper function to check if a pixel is white
    const isWhite = (x, y) => {
        const index = (y * width + x) * 4;
        return imgData[index] === 255 && imgData[index + 1] === 255 && imgData[index + 2] === 255 && imgData[index + 3] === 255;
    };

    // Helper function to find the largest rectangle of white space starting at (startX, startY)
    function findWhiteSpaceRectangle(startX, startY) {
        let maxX = startX;
        let maxY = startY;

        // Expand horizontally
        while (maxX < width && isWhite(maxX, startY) && !visited[startY][maxX]) {
            maxX++;
        }

        // Expand vertically
        while (maxY < height && isWhite(startX, maxY) && !visited[maxY][startX]) {
            maxY++;
        }

        // Mark the area as visited
        for (let y = startY; y < maxY; y++) {
            for (let x = startX; x < maxX; x++) {
                visited[y][x] = true;
            }
        }

        return {
            x: startX,
            y: startY,
            width: maxX - startX,
            height: maxY - startY
        };
    }

    // Iterate through the canvas to find white space rectangles
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (isWhite(x, y) && !visited[y][x]) {
                const whiteSpaceRect = findWhiteSpaceRectangle(x, y);
                whiteSpaceBlocks.push(whiteSpaceRect);
            }
        }
    }

    return whiteSpaceBlocks;
}*/
function ImposeVisual(allItems, sheetWidth, sheetHeight) {
    const c = document.getElementById("imCanvas");
    const ctx = c.getContext("2d");

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, c.width, c.height);

    // List of free rectangles (initially the whole sheet)
    let freeRectangles = [{ x: 0, y: 0, width: sheetWidth, height: sheetHeight }];

    for (let i = 0; i < allItems.length; i++) {
        let item = allItems[i];
        let placed = false;

        // Sort free rectangles by area (largest first)
        freeRectangles.sort((a, b) => (b.width * b.height) - (a.width * a.height));

        for (let j = 0; j < freeRectangles.length; j++) {
            let rect = freeRectangles[j];

            // Check if the item fits in the current rectangle (both orientations)
            if (item.Width <= rect.width && item.Height <= rect.height) {
                // Place the item
                placeItem(ctx, item, rect.x, rect.y);
                // Split the free space
                freeRectangles = splitFreeRectangles(freeRectangles, rect, item.Width, item.Height, rect.x, rect.y);
                placed = true;
                break;
            } else if (item.Height <= rect.width && item.Width <= rect.height) {
                // Place the item with rotation
                placeItem(ctx, item, rect.x, rect.y, true);
                // Split the free space
                freeRectangles = splitFreeRectangles(freeRectangles, rect, item.Height, item.Width, rect.x, rect.y);
                placed = true;
                break;
            }
        }

        if (!placed) {
            console.log(`Item ${item.Size} couldn't be placed.`);
        }
    }
}

function placeItem(ctx, item, x, y, rotated = false) {
    let width = rotated ? item.Height : item.Width;
    let height = rotated ? item.Width : item.Height;

    // Draw the item on the canvas
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = item.Color;
    ctx.fill();
    ctx.stroke();

    // Draw the text label
    let fontSize = Math.min(width, height) * 0.15;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(item.Size, x + width / 2, y + height / 2);

    // Update item position
    item.StartX = x;
    item.StartY = y;
}

function splitFreeRectangles(freeRectangles, rect, width, height, x, y) {
    let newFreeRectangles = [];

    for (let i = 0; i < freeRectangles.length; i++) {
        let freeRect = freeRectangles[i];

        // Check if the free rectangle overlaps with the placed item
        if (!(x >= freeRect.x + freeRect.width || x + width <= freeRect.x || 
              y >= freeRect.y + freeRect.height || y + height <= freeRect.y)) {
            
            // Prioritize splitting into larger rectangles first

            // Top rectangle
            if (y > freeRect.y) {
                newFreeRectangles.push({
                    x: freeRect.x,
                    y: freeRect.y,
                    width: freeRect.width,
                    height: y - freeRect.y
                });
            }

            // Bottom rectangle
            if (y + height < freeRect.y + freeRect.height) {
                newFreeRectangles.push({
                    x: freeRect.x,
                    y: y + height,
                    width: freeRect.width,
                    height: freeRect.y + freeRect.height - (y + height)
                });
            }

            // Left rectangle
            if (x > freeRect.x) {
                newFreeRectangles.push({
                    x: freeRect.x,
                    y: y,
                    width: x - freeRect.x,
                    height: freeRect.height
                });
            }

            // Right rectangle
            if (x + width < freeRect.x + freeRect.width) {
                newFreeRectangles.push({
                    x: x + width,
                    y: y,
                    width: freeRect.x + freeRect.width - (x + width),
                    height: freeRect.height
                });
            }
        } else {
            // Keep the free rectangle as it is if no overlap
            newFreeRectangles.push(freeRect);
        }
    }

    return newFreeRectangles;
}
