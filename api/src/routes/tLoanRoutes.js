const router = require('express').Router();
const validation = require('../middlewares/validation');
const TLoanController = require('../controllers/tLoanController');

router.get('/tloan', TLoanController.allLoan);
router.post('/tloan/newloan', validation.validateLoan, TLoanController.newLoan);
router.post('/tloan/loanDrafting', validation.validateLoan, TLoanController.SendDraft);
router.get('/tloans/:TLoanID', TLoanController.getLoanByNo);
router.get('/tloanitems/:TLoanID', TLoanController.getItemsByTloan);
router.get('/tloanExtensionStatus/:TLoanID', TLoanController.extensionStatus);
router.get('/tloan/current/:UserID', TLoanController.currentLoan);
router.get('/tloan/drafts/:UserID', TLoanController.draftsLoan);
router.get('/tloan/history/:UserID', TLoanController.historyLoan);
router.get('/tloan/pending/:UserID', TLoanController.pendingLoan);
// router.put('/tloan/ready', TLoanController.readyLoan);
router.put('/tloan/approve/:TLoanID', TLoanController.approveLoan);
router.put('/tloan/reject/:TLoanID', validation.validateRejectRemark, TLoanController.rejectLoan);
router.put('/tloan/approveExtension/:TLoanID', TLoanController.approveExtension);
router.put(
    '/tloan/rejectExtension/:TLoanID',
    validation.validateRejectRemark,
    TLoanController.rejectExtension
);
router.get('/tloan/ManagerLoan/:SalesManagerID', TLoanController.ManagerLoan);
router.get('/tloan/ManagerExtension/:SalesManagerID', TLoanController.ManagerExtension);
router.post('/tloan/extension', validation.validateExtensionRequest, TLoanController.LoanExtend);
router.get('/tloanid/:TLoanID', TLoanController.getIDofLoan);
router.get('/tloanstatusid/:TLoanID', TLoanController.tloanStatusID);
router.get('/tloan/approvedloans', TLoanController.getApprovedLoan);
router.get('/tloan/pickingloans', TLoanController.getPickingLoan);
router.get('/tloan/readyloans', TLoanController.getReadyLoan);
router.put(
    '/tloan/submitEditedDraft/:TLoanID',
    validation.validateLoan,
    TLoanController.SubmitAfterEdit
);
router.put(
    '/tloan/draftEditedDraft/:TLoanID',
    validation.validateLoan,
    TLoanController.DraftAfterEdit
);
router.get('/tloan/allCurrent', TLoanController.allCurrent);
router.get('/tloan/allHistory', TLoanController.allHistory);
router.put(
    '/tloan/updatestatus/:TLoanID',
    validation.validateStatusUpdate,
    TLoanController.updateStatus
);
router.get('/tloan/info/:TLoanID', TLoanController.getEmployeeInfo);
module.exports = router;
