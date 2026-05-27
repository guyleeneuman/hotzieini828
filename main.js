import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  set,
  get,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

/* FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyCY-XRSvSCWQciNHReJ0wT__mDIE1wmU50",
  authDomain: "hotzla.firebaseapp.com",
  databaseURL: "https://hotzla-default-rtdb.firebaseio.com",
  projectId: "hotzla",
  storageBucket: "hotzla.firebasestorage.app",
  messagingSenderId: "705558990754",
  appId: "1:705558990754:web:95e334cd6061a956d0ecfb",
  measurementId: "G-2M0QNHC133"
};

/* INIT */
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* ADD ORDER */
window.addOrder = function(name, status) {

  const ordersRef = ref(db, "orders");

  const newOrderRef = push(ordersRef);

  set(newOrderRef, {
    name: name,
    status: status
  });
}

/* GET ORDERS */
window.getOrders = async function() {

  const snapshot = await get(ref(db, "orders"));

  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.entries(data).map(([id, value]) => ({
    id,
    ...value
  }));
}

/* UPDATE STATUS */
window.updateStatus = function(id, status) {

  update(ref(db, "orders/" + id), {
    status: status
  });
}
/* DELETE ORDER */
window.deleteOrder = async function(id) {

  await remove(ref(db, "orders/" + id));

}