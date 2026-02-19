import { useState } from "react";

export default function UserFormModal({ onSubmit }){
    const [form, setForm] = useState({
        name: "",
        email: "",
        rut: "",
        password: "",                                           
        role: "user"
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    }

    return(
        <form onSubmit={handleSubmit} className="form">

            <input 
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                required
            />

            <input 
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />

            <input 
                name="rut"
                placeholder="RUT"
                value={form.rut}
                onChange={handleChange}
            />

            <input 
                name="password"
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
            />

            <select name="role" value={form.role} onChange={handleChange}>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
            </select>

            <button type="submit">Guardar</button>
        </form>
    );
}