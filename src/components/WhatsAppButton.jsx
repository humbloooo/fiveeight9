import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ message = "Hi, I'm interested in the Five Eight 9 Student Lofts!" }) => {
    const encodedMessage = encodeURIComponent(message);
    return (
        <a
            href={`https://wa.me/27155558900?text=${encodedMessage}`}
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
        >
            <MessageCircle size={32} />
        </a>
    );
};

export default WhatsAppButton;
