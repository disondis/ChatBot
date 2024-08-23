import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Spinner,
} from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [questionType, SetQuestionType] = useState("");
  const [userInput, SetUserInput] = useState("");
  const [aiAnswer, SetAiAnswer] = useState("");
  const [loading, SetLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form is submitted");

    const data = {
      contents: [
        {
          parts: [
            {
              text: `Question Type: ${questionType} Question: ${userInput}`,
            },
          ],
        },
      ],
    };

    try {
      SetLoading(true); // Start loading
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBgjF2hc9ii_3VlcM9UfeD0nljBkZY_HkY",
        data
      );

      const generatedText =
        response.data.candidates[0].content.parts[0].text.replace(/[*#]/g, "");
      console.log(generatedText);
      SetAiAnswer(generatedText);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      SetLoading(false); // Stop loading
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://img.freepik.com/premium-photo/photo-realistic-as-ai-chatbot-customer-engagement-concept-as-ai-chatbot-icon-paired-with-cu_980716-459530.jpg?w=740)", // Replace with your desired background image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
        padding: "50px 0",
      }}
    >
      <Container className="mt-4">
        <Row className="justify-content-center">
          {["General", "Translate", "Weather"].map((ele) => (
            <Col key={ele} xs="auto">
              <Button
                variant={questionType === ele ? "success" : "primary"}
                onClick={() => SetQuestionType(ele)}
                className="mx-2"
              >
                {ele}
              </Button>
            </Col>
          ))}
        </Row>
        <h3
          className="my-4 text-center"
          style={{
            fontFamily: "Poppins, sans-serif",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          Question Type: <b>{questionType}</b>
        </h3>
        <Form onSubmit={handleSubmit} className="text-center">
          <FormControl
            type="text"
            value={userInput}
            onChange={(e) => SetUserInput(e.target.value)}
            placeholder={`Enter your ${questionType} question`}
            className="mb-3 p-3"
            style={{
              maxWidth: "500px",
              margin: "0 auto",
              borderRadius: "10px",
              fontSize: "1.2em",
              textAlign: "center",
            }}
          />
          <Button
            type="submit"
            variant="info"
            className="px-5 py-2"
            style={{
              fontSize: "1.2em",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            Submit
          </Button>
        </Form>

        <div className="mt-4 text-center">
          {loading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            aiAnswer && (
              <div
                className="ai-answer p-4"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "8px",
                  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
                  color: "#333",
                }}
              >
                <h5
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  AI Answer:
                </h5>
                <p style={{ fontSize: "1.1em" }}>{aiAnswer}</p>
              </div>
            )
          )}
        </div>
        <p
          style={{
            marginLeft: "42%",
            marginTop: "20px",
            fontFamily: "Poppins, sans-serif",
            color: "#fff",
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          Designed By:
          <a href="https://www.linkedin.com/in/dison-t-20241a315/" style={{ color: "#ffdd57", textDecoration: "none" }}>
            Dison dys
          </a>
        </p>
      </Container>
    </div>
  );
};

export default App;
