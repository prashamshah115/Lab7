describe('Basic user flow for Website', () => {
  // First, visit the lab 7 website
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  // Each it() call is a separate test
  // Here, we check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');

    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });

    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  // We use .skip() here because this test has a TODO that has not been completed yet.
  // Make sure to remove the .skip after you finish the TODO. 
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');

    // Query select all of the <product-item> elements
    let allArePopulated = true;

    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        return data = item.data;
      })
     });

    /**
    **** TODO - STEP 1 ****
    * Right now this function is only checking the first <product-item> it found, make it so that
      it checks every <product-item> it found
    * Remove the .skip from this it once you are finished writing this test.
    */
  for (let i = 0; i < prodItemsData.length; i++) {
    const product = prodItemsData[i];
    console.log(`Checking product item 1/${prodItemsData.length}`);
    if(!product.title || product.title.length === 0) {
      console.log(`Missing title on product ${i+1}`);
      allArePopulated = false;
    }
    if(!product.price || product.price.length === 0) {
      console.log(`Missing price on product ${i+1}`);
      allArePopulated = false;
    }
    if(!product.image || product.image.length === 0) {
      console.log(`Missing image on product ${i+1}`);
      allArePopulated = false;
    }

  }

  }, 15000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');

    /**
     **** TODO - STEP 2 **** 
     * Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
     * Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
     * Once you have the button, you can click it and check the innerText property of the button.
     * Once you have the innerText property, use innerText.jsonValue() to get the text value of it
     * Remember to remove the .skip from this it once you are finished writing this test.
     */
     const firstItem = (await page.$$('product-item'))[0];

     const root = await firstItem.getProperty('shadowRoot');
     const button = await root.$('button');

     await button.click();
     const txt = await (await button.getProperty('innerText')).jsonValue();
     expect(txt).toBe('Remove from Cart');

     await button.click();

  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');

    /**
     **** TODO - STEP 3 **** 
     * Query select all of the <product-item> elements, then for every single product element
       get the shadowRoot and query select the button inside, and click on it.
     * Check to see if the innerText of #cart-count is 20
     * Remember to remove the .skip from this it once you are finished writing this test.
     */
      const items = await page.$$('product-item');
      for (let item of items) {
        const root = await item.getProperty('shadowRoot');
        const btn = await root.$('button');
        const text = await (await btn.getProperty('innerText')).jsonValue();
        if (text === 'Add to Cart') await btn.click();
      }

      const count = await page.$eval('#cart-count', el => parseInt(el.innerText));
      expect(count).toBe(20);

  }, 20000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    /**
     **** TODO - STEP 4 **** 
     * Reload the page, then select all of the <product-item> elements, and check every
       element to make sure that all of their buttons say "Remove from Cart".
     * Also check to make sure that #cart-count is still 20
     * Remember to remove the .skip from this it once you are finished writing this test.
     */
    await page.reload();

    const items = await page.$$('product-item');
    for (let item of items) {
      const root = await item.getProperty('shadowRoot');
      const btnText = await root.$eval('button', b => b.innerText);
      expect(btnText).toBe('Remove from Cart');
    }
   
    const count = await page.$eval('#cart-count', el => parseInt(el.innerText));
    expect(count).toBe(20);

  }, 20000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {

    /**
     **** TODO - STEP 5 **** 
     * At this point the item 'cart' in localStorage should be 
       '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
     * Remember to remove the .skip from this it once you are finished writing this test.
     */
    console.log('Verifying localStorage cart array...');

    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    const parsed = JSON.parse(cart);
    expect(parsed.length).toBe(20);
    for (let i = 1; i <= 20; i++) {
      expect(parsed).toContain(i);
    }

  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');

    /**
     **** TODO - STEP 6 **** 
     * Go through and click "Remove from Cart" on every single <product-item>, just like above.
     * Once you have, check to make sure that #cart-count is now 0
     * Remember to remove the .skip from this it once you are finished writing this test.
     */
     const items = await page.$$('product-item');
     for (let item of items) {
       const root = await item.getProperty('shadowRoot');
       const btn = await root.$('button');
       const text = await (await btn.getProperty('innerText')).jsonValue();
       if (text === 'Remove from Cart') await btn.click();
     }
 
     const count = await page.$eval('#cart-count', el => parseInt(el.innerText));
     expect(count).toBe(0);
    

  }, 20000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    /**
     **** TODO - STEP 7 **** 
     * Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
       is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
     * Also check to make sure that #cart-count is still 0
     * Remember to remove the .skip from this it once you are finished writing this test.
     */
    await page.reload();

    const items = await page.$$('product-item');
    for (let item of items) {
      const root = await item.getProperty('shadowRoot');
      const btnText = await root.$eval('button', b => b.innerText);
      expect(btnText).toBe('Add to Cart');
    }
   
    const count = await page.$eval('#cart-count', el => parseInt(el.innerText));
    expect(count).toBe(0);

  }, 20000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');

    /**
     **** TODO - STEP 8 **** 
     * At this point he item 'cart' in localStorage should be '[]', check to make sure it is
     * Remember to remove the .skip from this it once you are finished writing this test.
     */
     const cart = await page.evaluate(() => localStorage.getItem('cart'));
     expect(JSON.parse(cart)).toEqual([]);

  });
});
