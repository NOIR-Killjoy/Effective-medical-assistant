import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../config";
import DcotorsDropDown from "../../DoctorDropDown/DoctorDropDown";

const KidneyDiseaseTest = () => {
  const [inputData, setInputData] = useState({
    Age: "",
    Blood_Pressure: "",
    Specific_Gravity: "",
    Albumin: "",
    Sugar: "",
    Red_Blood_Cells: "",
    Pus_Cell: "",
    Serum_Creatinine: "",
    Hemoglobin: "",
    Packed_Cell_Volume: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [formError, setFormError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormFilled = Object.values(inputData).every(
      (value) => value.trim() !== ""
    );
    if (!isFormFilled) {
      setFormError("Please fill out all fields.");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/kidney`, {
        data: inputData,
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="m-5 row mb-32">
      <div className="col-md-2"></div>
      <div className="col-md-8">
        <h1 className="text-center text-3xl font-bold mb-8">
          Kidney Disease Predictor
        </h1>
        <div className="card border border-black rounded-lg p-8">
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(inputData).map(([name, value]) => (
                <div key={name} className="col-span-1">
                  <input
                    className="border border-black p-2 w-full"
                    type="text"
                    name={name}
                    placeholder={name.replace(/_/g, " ")}
                    value={value}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              {formError && (
                <div className="text-red-500 mb-4">{formError}</div>
              )}
            </div>
            <input
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mt-3"
              value="Predict"
            />
          </form>
          {prediction !== null && (
            <div
              className={`mt-3 ${
                prediction.includes("[1]") ? "bg-red-400" : "bg-green-400"
              } text-2xl`}
            >
              <h3 className="text-center">
                {prediction.includes("[1]")
                  ? "Sorry! Please consult your doctor."
                  : "Great! You are HEALTHY."}
              </h3>
            </div>
          )}
        </div>
      </div>
      <DcotorsDropDown
        testName={"Diabetes Disease Predictor"}
        testResult={prediction?.includes("[1]") ? "Unhealthy" : "Healthy"}
      />
    </div>
  );
};

export default KidneyDiseaseTest;
