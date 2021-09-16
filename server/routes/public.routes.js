const express = require('express');
const Order = require('../models/order.model');

const router = express.Router();

router.get('/test', (req, res) => {
  console.log('Test endpoint hit!');
  res.json({ success: true });
});

router.get('/current-orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.post('/add-order', async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ success: false, error: 'No information sent.' })
      return;
    }
  
    if (!req.body.order_item) {
      res.status(400).json({ success: false, error: 'No order item sent.'});
      return;
    }
  
    if (!req.body.quantity) {
      res.status(400).json({ success: false, error: 'No quantity sent.'})
      return;
    }
  
    const orderObj = new Order({
      order_item: req.body.order_item,
      quantity: req.body.quantity,
      ordered_by: req.body.ordered_by,
    });
  
    const dbResponse = await orderObj.save();
    if (dbResponse && dbResponse._id) {
      res.status(200).json({ success: true, insertedId: dbResponse._id });
    } else {
      res.status(400).json({ success: false, error: 'Database Error' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.post('/edit-order', async (req, res) => {
  // expects id
  try {
    if (!req.body.id) {
      res.status(400).json({ success: false, error: 'No id supplied'});
      return;
    }
    
    // make sure an order exists in the database with that id
    const targetOrder = await Order.findOne({ _id: req.body.id });
    if (!targetOrder) {
      res.status(400).json({ success: false, error: 'No order exists with that id!' });
      return;
    }

    const updateResponse = await Order.updateOne({
      _id: req.body.id
    }, {
      ordered_by: req.body.ordered_by,
      order_item: req.body.order_item,
      quantity: req.body.quantity,
    });

    if (!updateResponse || !updateResponse.nModified) {
      res.status(400).json({ success: false, error: 'Error in database while updating' });
      return;
    }
    res.status(200).json({ success: true });
  } catch(error) {
    res.status(500).json({ success: false, error });
  }
});

router.post('/delete-order', async (req, res) => {
  try {
    // expects id
    if (!req.body.id) {
      res.status(400).json({ success: false, error: 'No id supplied' });
      return;
    }

    // make sure an order exists in the database with that id
    const targetOrder = await Order.findOne({ _id: req.body.id });
    if (!targetOrder) {
      res.status(400).json({ success: false, error: 'No order exists with that id!' });
      return;
    }

    const deleteResponse = await Order.deleteOne({ _id: req.body.id });
    if (!deleteResponse || !deleteResponse.n) {
      res.status(400).json({ success: false, error: 'Unable to delete from database' });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.delete('/delete-all', async (req, res) => {
  try {
    // HITTING THIS ENDPOINT DELETES ALL ORDERS
    const deleteResponse = await Order.deleteMany({});
    if (!deleteResponse) {
      res.status(400).json({ success: false, error: 'Error deleting all orders.' });
      return;
    }
    res.status(200).json({ success: true, deleted: deleteResponse.n });

  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.post('/live-mode', async (req, res) => {
  try {
    const secsPerUpdate = !req.body || isNaN(req.body.time) ? 5 : req.body.time; 
    
    res.status(200).json({ success: true });

    const limit = 12;
    let count = 0;
    for (i = 0; i < limit; i++) {
      setTimeout(() => { liveUpdate(count, limit); count++; }, i * secsPerUpdate * 1000);
      if (i === limit - 1) {
        setTimeout(() => console.log('Live mode ending after next step...'), i * secsPerUpdate * 1000);
      }
    }
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ success: false, error })
  }
  
})

async function liveUpdate(index, limit) {
  const items = ['Live Soup', 'Live Pasta', 'Live Steak'];
  const rand = Math.random();
  const orders = await Order.find();
  if (orders.length < 3) {
    addRandom();
  } else if (orders.length > 5) {
    deleteRandom();
  } else {
    rand > 0.5 ? addRandom() : deleteRandom();
  }
  
  async function addRandom() {
    const orderObj = new Order({
      order_item: items[Math.floor(Math.random() * 3)],
      quantity: Math.floor(Math.random() * 5),
      ordered_by: 'Live updater',
    });
  
    const dbResponse = await orderObj.save();
    console.log(`Added Order - Step ${index + 1} of ${limit}`)
  }

  async function deleteRandom() {
    const sorted = orders.sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      return aDate.getTime() - bDate.getTime(); 
    });
    const target = sorted[0]._id;
    if (!target && target !== 0) return;
    const deleteResponse = await Order.deleteOne({ _id: target });
    console.log(`Deleted Order - Step ${index + 1} of ${limit}`)
  }
}

module.exports = router;
