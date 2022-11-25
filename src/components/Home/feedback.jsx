import React from "react";
// import "./src/App.css"
import Header from "../Partial/Header";
import { FaLaugh } from "react-icons/fa";


const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};
function Feedback() {
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = React.useState(0);
  const [hoverValue, setHoverValue] = React.useState(undefined);

  const handleClick = value => {
    setCurrentValue(value);
  };

  const handleMouseOver = value => {
    setHoverValue(value)
  }

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }
  return (
    <div>
      <Header />
      <div className="container ">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-10">
            
              <div className="row">
                <div className="col-md-6  ">
                  <div className=" images p-3">
                    <div className="text-center p-4">
                      <img id="main-image" src="https://previews.123rf.com/images/schlaumal/schlaumal1804/schlaumal180400335/100150207-quality-check-clipboard-icon.jpg" width="400px" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product p-4">
                    <div className="mt-4 mb-3">
                      <h6 className="text-uppercase">Chào các bạn!</h6>
                    </div>
                    <h7 className="text">Cảm ơn bạn đã luôn quan tâm và ủng hộ nhà Happy Food, chúng tôi rất vui khi
                      được trở thành một trong những sự cân nhắc
                      của bạn trong cuộc sống hàng ngày và rất vinh hạnh khi mang đến cho bạn những điều tuyệt vời nhất.
                    </h7>
                    <p>Những đóng góp của bạn là món quà trân quý nhất giành cho sự phát triển của chúng tôi.</p>
                    <div className="cart mt-4 align-items-center">
                      <div style={styles.container}>
                        <h2></h2>
                        <div style={styles.stars}>
                          {stars.map((_, index) => {
                            return (
                              <FaLaugh
                                key={index}
                                size={24}
                                style={{
                                  marginRight: 10,
                                  cursor: "pointer"
                                }}
                                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                              />
                            )
                          })}
                        </div>
                        <textarea
                          placeholder="What is your feedback"
                          style={styles.textarea}
                        />
                        <button style={styles.button}>Submit</button>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"

  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300
  },
  button: {
    color: "#fff",
    background: "#295F2D",
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  }

};

export default Feedback;