---
title: Import an Invoice
layout: article
---

Typing a dealer invoice into the app line by line is the slowest part of stacking. With **Import Invoice**, you hand *Precious Metals Manager* the PDF or a photo of your invoice and it fills in the order for you — seller, invoice and tracking numbers, shipping, date and every line item — ready for you to review before saving.

It runs entirely on your device using Apple Intelligence. Your invoice is never uploaded anywhere.

---

## What You Need

* iOS 26 or macOS 26 or later
* A device that supports Apple Intelligence

> If your device doesn't support it, the "Import Invoice" option simply won't appear and you can [create the order manually](https://preciousmetalsmanager.com/help/create-order/).

---

## How to Import an Invoice

1. **Open the Orders tab and tap "+"**
   Choose **Import Invoice** from the menu.

2. **Pick your file**
   Select a **PDF** or an **image**. Text-based PDFs are read directly; scanned PDFs and photos go through text recognition first.

3. **Wait for the scan**
   You'll see *Reading invoice…* followed by *Finding products…* with a progress indicator. Longer invoices take a little more time.

4. **Review the order details**
   The form opens pre-filled with:

   * Seller name
   * Invoice Number
   * Tracking Number
   * Shipping
   * Order Date

   If the invoice uses an ambiguous date format, a warning appears so you can check that the day and month aren't swapped.

5. **Check the items**
   Each line shows the matched product name with its quantity and unit price. Lines tagged **Review** in orange either weren't found in the product catalog or are missing a weight — tap one to open it and confirm the metal, form factor, product preset, net weight, purity, year, quantity and unit price. Swipe left on a line to drop it from the import.

6. **Compare the totals**
   The bottom section shows the **items total** next to the **invoice subtotal**. If they don't match, you'll get a warning to re-check the quantities and prices.

7. **Tap "Save"**
   The order and all of its items are created at once.

---

## What Happens on Save

* If you already have a seller with that name, the order is attached to it instead of creating a duplicate.
* The historical **spot price for the order date** is fetched automatically and stored on each item, so your premium figures are correct from the start.
* **Tax is not imported.** If your invoice includes sales tax, edit the items afterwards to add the tax rate.

---

## Tips & Notes

* Review every line before saving. The scan is good, but a misread weight or purity throws off your premium and melt-value figures.
* Clear, flat, well-lit photos read far better than angled shots of a crumpled invoice.
* Matching works against the product catalog, so well-known coins and bars are recognised most reliably. Anything unusual will land in the Review state for you to fill in.
* On the free plan an import is blocked if it would push you past the {{ site.free_item_limit }}-item limit. Upgrade to Pro to import larger invoices.

---

## That's It!

One file, one review pass, and a full order is in your portfolio. Have questions or feedback? Reach out via the app's Send feedback section!
