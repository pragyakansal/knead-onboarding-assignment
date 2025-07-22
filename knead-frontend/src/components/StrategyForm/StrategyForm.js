import React, {useState} from 'react';
import './StrategyForm.css'
import MessageModal from '../MessageModal/MessageModal';

const StrategyForm = ({ onSuccess }) => {
  const [strategyTitle, setStrategyTitle] = useState('');
  const [comment, setComment] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const successMessage = 'The strategy was submitted successfully.';
  const errorMessage = 'The strategy could not be submitted.';

  const handleCloseModal = () => {
    setShowModal(false);
  }
  // Prevent reloading the page after submitting form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/strategies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategyTitle,
          comment,
        }),
      });
      console.log("response: ", response);
      console.log("response data", response.formData);
      if (response.ok) {
        setFeedbackMessage(successMessage);
        setShowModal(true);
        // Reset form fields back to empty fields
        setStrategyTitle('');
        setComment('');
        onSuccess();
      } else {
        setFeedbackMessage(errorMessage);
        setShowModal(true);
      }
    } catch (error) {
      console.error("There was an error submitting the strategy: ", error);
      setFeedbackMessage("An error occurred.");
    }
  }

  return (
    <>
    <form className="strategy-form" onSubmit={handleSubmitForm}>
        <h1 className="heading">Create New Strategy</h1>
        <div className="input-container">
          <label>Strategy Title</label>
          {/* Updates corresponding state variable when input value is changed */}
          <input 
            className="title-box"
            type="text" 
            value={strategyTitle} 
            onChange={(e) => setStrategyTitle(e.target.value)} 
            placeholder="Enter your strategy title"
            required/>
        </div>
        <div className="input-container">
        <label>Comment</label>
        <textarea 
          className="comment-box"
          value={comment} 
          onChange={(e) => setComment(e.target.value)}
          placeholder="Describe your strategy in detail"
          required />
        </div>
        <button type="submit" className="submit-button">Submit</button>
        {showModal && (
          <MessageModal 
            feedbackMessage={feedbackMessage}
            errorMessage={errorMessage}
            successMessage={successMessage}
            onClose={handleCloseModal}
          /> )}
      </form>
    </>
  );
}

export default StrategyForm;