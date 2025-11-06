import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import DonorList from "./components/donors/DonorList.jsx";
import BloodDonorForm from "./components/donors/DonorForm.jsx";
import ReceiverForm from "./components/receivers/ReceiverForm.jsx";
// import ReceiverList from "./components/receivers/ReceiverLIst.jsx";
import DonorStock from "./components/stock/DonorsStock.jsx";
import HospitalStock from "./components/stock/HospitalStock.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donor-registration" element={<BloodDonorForm />} />
        <Route path="/donor-list" element={<DonorList />} />
        <Route path="/receiver-register" element={<ReceiverForm />} />
        <Route path="/donor-stock" element={<DonorStock />} />
        <Route path="/hospital-stock" element={<HospitalStock />} />

        {/* <Route path="/find-donors" element={<FindDonors />} /> */}
      </Routes>

    </Router>
  );
}

export default App;
