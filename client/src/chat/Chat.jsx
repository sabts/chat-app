import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = () => {
	const [isConnected, setIsConnected] = useState(false);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on('connect', () => setIsConnected(true));
		socket.on('disconnect', () => setIsConnected(false));

		socket.on('mensaje', data => {
			setMessages(prev => [...prev, data]);
		});

		return () => {
			socket.off('connect');
			socket.off('disconnect');
			socket.off('message');
		};
	}, []);

	return (
		<>
			<h2>Chat APP</h2>
			<p>User is {isConnected ? 'Connected' : 'Disconnect'}</p>
			<div>
				{messages.map((text, index) => (
					<p key={index}>{text}</p>
				))}
			</div>
			<div>
				<input
					type='text'
					placeholder='type a message'
					value={message}
					onChange={e => setMessage(e.target.value)}
				/>
				<button onClick={() => sendMessage(socket, message, setMessage)}>
					Send
				</button>
			</div>
		</>
	);
};

const sendMessage = (socket, message, setMessage) => {
	if (message.trim()) {
		socket.emit('mensaje', message);
		setMessage('');
	}
};

export default Chat;
