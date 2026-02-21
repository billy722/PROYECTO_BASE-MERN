import { useState } from "react";
import "./userForm.css";

export default function UserFormModal({ onSubmit }){
    const [errors, setErrors] = useState({});

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await onSubmit(form);
            setErrors({});
        }catch(error){
            if(error.response?.data?.errors){
                setErrors(error.response.data.errors);
            }
        }

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
            {errors.email && <p className="error">{errors.email}</p>}


            <input 
                name="rut"
                placeholder="RUT"
                value={form.rut}
                onChange={handleChange}
            />
            {errors.rut && <p className="error">{errors.rut}</p>}
            

            <input 
                name="password"
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
            />
            {errors.password && <p className="error">{errors.password}</p>}


            <select name="role" value={form.role} onChange={handleChange}>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
            </select>
            {errors.role && <p className="error">{errors.role}</p>}


            <button type="submit">Guardar</button>
        </form>
    );
}