/**
 * Counter Component
 * 
 * A versatile counter component with the following features:
 * - Increment/Decrement with custom step
 * - Auto-increment functionality
 * - Operation history tracking
 * - Responsive design
 * 
 * This component is ideal for testing:
 * - State management
 * - User interactions
 * - Side effects (useEffect)
 * - Conditional rendering
 * - Event handling
 */
import React, { useState, useEffect } from 'react';
import './Counter.css';

const Counter = () => {
  // State for the current count value
  const [count, setCount] = useState(0);
  
  // State for the step value (how much to increment/decrement by)
  const [step, setStep] = useState(1);
  
  // State to track if auto-increment is active
  const [autoIncrement, setAutoIncrement] = useState(false);
  
  // State to store operation history
  const [history, setHistory] = useState([]);

  /**
   * Effect to handle auto-increment functionality
   * Sets up an interval when autoIncrement is true
   * Cleans up the interval when component unmounts or dependencies change
   */
  useEffect(() => {
    let interval;
    
    // Only set up the interval if autoIncrement is true
    if (autoIncrement) {
      interval = setInterval(() => {
        // Update count by the current step
        setCount(prevCount => {
          const newCount = prevCount + step;
          // Add to history for tracking
          addToHistory(`Auto-incremented by ${step} to ${newCount}`);
          return newCount;
        });
      }, 1000); // Update every second
    }
    
    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [autoIncrement, step]); // Re-run effect when these dependencies change

  /**
   * Adds a new entry to the operation history
   * @param {string} action - Description of the action performed
   */
  const addToHistory = (action) => {
    setHistory(prev => [
      // Add new history item with current timestamp
      { 
        action, 
        timestamp: new Date().toLocaleTimeString() 
      },
      // Spread previous history items
      ...prev
    ].slice(0, 5)); // Keep only the last 5 history items for display
  };

  /**
   * Increments the counter by the current step value
   */
  const increment = () => {
    setCount(prevCount => {
      const newCount = prevCount + step;
      addToHistory(`Incremented by ${step} to ${newCount}`);
      return newCount;
    });
  };

  /**
   * Decrements the counter by the current step value
   */
  const decrement = () => {
    setCount(prevCount => {
      const newCount = prevCount - step;
      addToHistory(`Decremented by ${step} to ${newCount}`);
      return newCount;
    });
  };

  /**
   * Resets the counter to 0 and step to 1
   * Also stops auto-increment if active
   */
  const reset = () => {
    setCount(0);
    setStep(1);
    setAutoIncrement(false);
    addToHistory('Counter reset to 0');
  };

  /**
   * Toggles the auto-increment feature on/off
   */
  const toggleAutoIncrement = () => {
    const newState = !autoIncrement;
    setAutoIncrement(newState);
    // Add appropriate history entry based on new state
    if (newState) {
      addToHistory('Auto-increment started');
    } else {
      addToHistory('Auto-increment stopped');
    }
  };

  /**
   * Handles changes to the step input
   * Ensures step is always between 1 and 10
   * @param {Object} e - The change event from the input
   */
  const handleStepChange = (e) => {
    // Parse input value to integer, default to 1 if invalid
    const newStep = parseInt(e.target.value, 10) || 1;
    // Clamp value between 1 and 10
    setStep(Math.max(1, Math.min(10, newStep)));
  };

  return (
    // Main container section with test ID for testing
    <section className="counter-section" data-testid="counter-component">
      <h2>Counter</h2>
      
      <div className="counter-display" data-testid="counter-display">
        <span className="counter-value">{count}</span>
      </div>
      
      <div className="counter-controls">
        <div className="step-control">
          <label htmlFor="step">Step:</label>
          <input
            type="number"
            id="step"
            min="1"
            max="10"
            value={step}
            onChange={handleStepChange}
            disabled={autoIncrement}
            data-testid="step-input"
          />
        </div>
        
        <div className="button-group">
          <button 
            onClick={decrement} 
            className="btn btn-decrement"
            disabled={autoIncrement}
            data-testid="decrement-button"
          >
            -{step}
          </button>
          
          <button 
            onClick={increment} 
            className="btn btn-increment"
            disabled={autoIncrement}
            data-testid="increment-button"
          >
            +{step}
          </button>
          
          <button 
            onClick={toggleAutoIncrement} 
            className={`btn ${autoIncrement ? 'btn-stop' : 'btn-auto'}`}
            data-testid="auto-button"
          >
            {autoIncrement ? 'Stop' : 'Auto'}
          </button>
          
          <button 
            onClick={reset} 
            className="btn btn-reset"
            disabled={autoIncrement}
            data-testid="reset-button"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="counter-history">
        <h3>History</h3>
        {history.length > 0 ? (
          <ul data-testid="history-list">
            {history.map((item, index) => (
              <li key={index}>
                <span className="history-time">[{item.timestamp}]</span>
                <span className="history-action">{item.action}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-history" data-testid="no-history">No history yet. Start counting!</p>
        )}
      </div>
    </section>
  );
};

export default Counter;
