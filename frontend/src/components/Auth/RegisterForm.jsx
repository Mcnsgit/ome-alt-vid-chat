import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";


export function RegisterForm({ onToggleForm }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const { username, email, password,} = formData;
        }
    }
}

