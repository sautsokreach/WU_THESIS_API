import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllTransaction = (req, res) => {
  db.query(`select * from transactions`, (err, data) => {
    res.json(data.rows);
  });
};

const createTransaction = (req, res) => {
  const bill_no = req.body.bill_no;
  const transaction_id  = req.body.transaction_id;
  const transaction_date  = req.body.transaction_date;
  const transaction_time = req.body.transaction_time;
  const payer_account_no  = req.body.payer_account_no;
  const payer_name  = req.body.payer_name;
  const currency_code  = req.body.currency_code;
  const payment_method  = req.body.payment_method;
  const amount  = req.body.amount;
  const sender_bank_name  = req.body.sender_bank_name;
  const sender_account_name  = req.body.sender_account_name;
  const settlement_date  = req.body.settlement_date;
  const settlement_time  = req.body.settlement_time;
  const settlement_status  = req.body.settlement_status;
  const settlement_error_message  = req.body.settlement_error_message;
  const remark  = req.body.remark;

  const queryCreateRoom =
    "INSERT INTO transactions( bill_no ,transaction_id , transaction_date , transaction_time ,payer_account_no,payer_name ,currency_code,payment_method,amount,sender_bank_name ,sender_account_name ,settlement_date ,settlement_time,settlement_status,settlement_error_message,remark) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)";

  db.query(
    queryCreateRoom,
    [bill_no,transaction_id, transaction_date, transaction_time,payer_account_no,payer_name,currency_code,payment_method,amount,sender_bank_name,sender_account_name,settlement_date,settlement_time,settlement_status,settlement_error_message,remark],
    (err, data) => {
      if (err) {
        console.log(err)
        return res.json(err);
      }
      return res.status(200).json("Transaction Has Been Created!");
    }
  );
};


export {
  getAllTransaction,
  createTransaction
};
