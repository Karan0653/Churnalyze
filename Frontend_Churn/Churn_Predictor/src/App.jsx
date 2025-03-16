import { useState } from "react";
import "./App.css";
import "./loader.css";
import { BarChart } from "@mui/x-charts/BarChart";



const App = () => {
  const [formData, setFormData] = useState({
    gender: "",
    seniorCitizen: "",
    partner: "",
    dependents: "",
    tenure: "",
    phoneService: "",
    multipleLines: "others",
    internetService: "",
    onlineSecurity: "others",
    onlineBackup: "others",
    deviceProtection: "others",
    techSupport: "",
    streamingTV: "",
    streamingMovies: "others",
    contract: "",
    paperlessBilling: "",
    paymentMethod: "",
    monthlyCharges: "",
    totalCharges: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const convertData = () => {
    return {
      gender: formData.gender === "Male" ? 0 : 1,
      seniorCitizen: Number(formData.seniorCitizen),
      partner: formData.partner === "Yes" ? 1 : 0,
      dependents: formData.dependents === "Yes" ? 1 : 0,
      tenure: Number(formData.tenure),
      phoneService: formData.phoneService === "Yes" ? 1 : 0,
      multipleLines:
        formData.multipleLines === "Yes"
          ? 1
          : formData.multipleLines === "No"
          ? 0
          : 2,
      internetService:
        formData.internetService === "DSL"
          ? 1
          : formData.internetService === "Fiber optic"
          ? 2
          : 0,
      onlineSecurity:
        formData.onlineSecurity === "Yes"
          ? 1
          : formData.onlineSecurity === "No"
          ? 0
          : 2,
      onlineBackup:
        formData.onlineBackup === "Yes"
          ? 1
          : formData.onlineBackup === "No"
          ? 0
          : 2,
      deviceProtection:
        formData.deviceProtection === "Yes"
          ? 1
          : formData.deviceProtection === "No"
          ? 0
          : 2,
      techSupport:
        formData.techSupport === "Yes"
          ? 1
          : formData.techSupport === "No"
          ? 0
          : 2,
      streamingTV:
        formData.streamingTV === "Yes"
          ? 1
          : formData.streamingTV === "No"
          ? 0
          : 2,
      streamingMovies:
        formData.streamingMovies === "Yes"
          ? 1
          : formData.streamingMovies === "No"
          ? 0
          : 2,
      contract:
        formData.contract === "Month-to-month"
          ? 0
          : formData.contract === "One year"
          ? 1
          : 2,
      paperlessBilling: formData.paperlessBilling === "Yes" ? 1 : 0,
      paymentMethod:
        formData.paymentMethod === "Electronic check"
          ? 0
          : formData.paymentMethod === "Mailed check"
          ? 1
          : formData.paymentMethod === "Bank transfer (automatic)"
          ? 2
          : 3,
      monthlyCharges: parseFloat(formData.monthlyCharges),
      totalCharges: parseFloat(formData.totalCharges),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    for (const key in formData) {
      if (!formData[key]) {
        setError(`Please fill out ${key.replace(/([A-Z])/g, " $1")}`);
        return;
      }
    }

    setError(""); // Clear previous errors

    const processedData = convertData();

    console.log("Processed Data:", processedData);

    setLoading(true);

    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features: Object.values(processedData) }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Prediction Response:", response);
        setTimeout(() => {
          setResult(response);
          setLoading(false);
        }, 2000);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleBack = () => {
    setResult(null);
    setFormData({
      gender: "",
      seniorCitizen: "",
      partner: "",
      dependents: "",
      tenure: "",
      phoneService: "",
      multipleLines: "others",
      internetService: "",
      onlineSecurity: "others",
      onlineBackup: "others",
      deviceProtection: "others",
      techSupport: "",
      streamingTV: "",
      streamingMovies: "others",
      contract: "",
      paperlessBilling: "",
      paymentMethod: "",
      monthlyCharges: "",
      totalCharges: "",
    });
  };

  return (
    <div className="container">
      <h1 className="title">
        Churnalyze⚡{" "}
        <span style={{ paddingLeft: "20px" }}>(Churn + Analyze)</span>
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && (
        <div
          style={{
            width: "100%",
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div class="loader"></div>
          <div
            style={{
              marginLeft: "20px",
              fontFamily: "sans-serif",
              fontStyle: "italic",
              fontWeight: "700",
            }}
          >
            {" "}
            Predicting...
          </div>
        </div>
      )}

      {!result && !loading && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-row">
            <label>Senior Citizen:</label>
            <select
              name="seniorCitizen"
              value={formData.seniorCitizen}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="form-row">
            <label>Partner:</label>
            <select
              name="partner"
              value={formData.partner}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-row">
            <label>Dependents:</label>
            <select
              name="dependents"
              value={formData.dependents}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-row">
            <label>Tenure (months):</label>
            <input
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Phone Service:</label>
            <select
              name="phoneService"
              value={formData.phoneService}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* <label>Multiple Lines:</label>
        <select
          name="multipleLines"
          value={formData.multipleLines}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="No phone service">No phone service</option>
        </select> */}

          <div className="form-row">
            <label>Internet Service:</label>
            <select
              name="internetService"
              value={formData.internetService}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="DSL">DSL</option>
              <option value="Fiber optic">Fiber optic</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* <label>Online Security:</label>
        <select
          name="onlineSecurity"
          value={formData.onlineSecurity}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="No internet service">others</option>
        </select> */}

          {/* <label>Online Backup:</label>
        <select
          name="onlineBackup"
          value={formData.onlineBackup}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="No internet service">others</option>
        </select> */}

          {/* <label>Device Protection:</label>
        <select
          name="deviceProtection"
          value={formData.deviceProtection}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="No internet service">others</option>
        </select> */}

          <div className="form-row">
            <label>Tech Support:</label>
            <select
              name="techSupport"
              value={formData.techSupport}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No internet service">others</option>
            </select>
          </div>

          <div className="form-row">
            <label>Streaming Tv</label>
            <select
              name="streamingTV"
              value={formData.streamingTV}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No internet service">others</option>
            </select>
          </div>
          {/* 
        <label>Streaming Movies</label>
        <select
          name="streamingMovies"
          value={formData.streamingMovies}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="No internet service">others</option>
        </select> */}

          <div className="form-row">
            <label>Contract:</label>
            <select
              name="contract"
              value={formData.contract}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Month-to-month">Month-to-month</option>
              <option value="One year">One year</option>
              <option value="Two year">Two year</option>
            </select>
          </div>

          <div className="form-row">
            <label>Paperless Billing:</label>
            <select
              name="paperlessBilling"
              value={formData.paperlessBilling}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-row">
            <label>Payment Method:</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Electronic check">Electronic check</option>
              <option value="Mailed check">Mailed check</option>
              <option value="Bank transfer (automatic)">
                Bank transfer (automatic)
              </option>
              <option value="Credit card (automatic)">
                Credit card (automatic)
              </option>
            </select>
          </div>

          <div className="form-row">
            <label>Monthly Charges:</label>
            <input
              type="number"
              name="monthlyCharges"
              value={formData.monthlyCharges}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Total Charges:</label>
            <input
              type="number"
              name="totalCharges"
              value={formData.totalCharges}
              onChange={handleChange}
            />
          </div>

          <div className="submit">
            <button className="submit-btn" type="submit">
              Predict 🔮
            </button>
          </div>
        </form>
      )}

      {result && (
        <div className="result">
          <div style={{ width: "80%", height: "full" }}>
            <h2 className="res-title">Prediction Result ✅</h2>
            <div className="res-content">
              <p>
                <strong>Prediction:</strong>{" "}
                {result.churn_prediction === 1
                  ? "Customer is likely to churn"
                  : "The customer is unlikely to churn"}
              </p>
              <p>
                <strong>Probability:</strong>{" "}
                {(result.churn_probability * 100).toFixed(2)}%
              </p>
              <BarChart
                xAxis={[
                  {
                    id: "barCategories",
                    data: ["Churn Probability (in %)"],
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: [(result.churn_probability * 100).toFixed(2)],
                  },
                ]}
                width={500}
                height={300}
              />
            </div>
            <button className="back-btn" onClick={handleBack}>
              &#8592; Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

// 1, 0, 0, 0, 2, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 2, 53.85, 108.15 - predicts yes
// 0, 0, 0, 2, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 3, 3.85, 108.15, 1 - predicts no

// other - 1 - no internet service

// gender (Female - 0, male - 1) ||	SeniorCitizen - 0/1 || 	Partner 0/1 ||	Dependents - 0/1 ||	tenure 12....50 ||
// 	PhoneService 0/1 ||	MultipleLines (0-no/1-others/2-yes) ||	InternetService (dsl-0/fibop-1/2) ||	OnlineSecurity (no-0/yes-2/other-1)

// OnlineBackup yes-2/no-0/other-1 ||	DeviceProtection yes-2/no-0 ||	TechSupport yes-2/no-0 || StreamingTV yes-2/no-0
// 	StreamingMovies	yes-2/no-0 || Contract (mo-mon- 0/ oneyear - 1/ 2year - 2) ||	PaperlessBilling 1/0 || PaymentMethod	(Electronic check-2/Mailed check-3/other-0)
// MonthlyCharges	TotalCharges

//male, no, no, no, 2, yes, no, fiber, others, others, no, no, no
// no, mon-mon, yes, mailed check, 50, 120 - predicts yes

//female, no, no, no, 4, no, no
// fiber, others, others, others,others, no,
// no, two-year, yes, bank-transfer, 30, 108  - predicts no
