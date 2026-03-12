import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config';

const WhatsAppButton = ({ message = "Hi, I'm interested in the Five Eight 9 Student Lofts!" }) => {
    const [whatsappNumber, setWhatsappNumber] = useState('27155558900'); // Default

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/settings`);
                // Priority: Specific WhatsApp link > Reception Number > Default
                const settings = res.data;
                const link = settings.socialLinks?.whatsapp?.link;
                const reception = settings.emergencyContacts?.reception;
                
                if (link && link.includes('wa.me')) {
                    // Extract number from link if possible or use as is
                    setWhatsappNumber(link.replace(/[^0-9]/g, ''));
                } else if (reception) {
                    setWhatsappNumber(reception.replace(/[^0-9]/g, ''));
                }
            } catch (err) {
                console.error('Error fetching whatsapp settings:', err);
            }
        };
        fetchSettings();
    }, []);

    const encodedMessage = encodeURIComponent(message);
    return (
        <a
            href={`https://wa.me/${whatsappNumber}?text=${encodedMessage}`}
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
