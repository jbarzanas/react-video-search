import React from "react";
import ReactDOM from "react-dom/client";
import VideoSearch from './components/VideoSearch';
import './assets/stylesheets/style.css';

const apiKey = 'AIzaSyCKYzTaYomW0Vu0uVI2ZFyhdfy-Eb587Sc';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<VideoSearch apiKey={apiKey} />);


