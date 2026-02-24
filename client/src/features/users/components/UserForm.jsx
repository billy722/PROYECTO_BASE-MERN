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
                className="input"
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                required
            />

            <input 
                className={`input ${errors.email ? "input-error" : "" }`}
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}


            <input 
                className={`input ${errors.rut ? "input-error" : "" }`}
                name="rut"
                placeholder="RUT"
                value={form.rut}
                onChange={handleChange}
            />
            {errors.rut && <p className="form-error">{errors.rut}</p>}
            

            <input 
                className={`input ${errors.password ? "input-error" : "" }`}
                name="password"
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
            />
            {errors.password && <p className="form-error">{errors.password}</p>}


            <select name="role" value={form.role} onChange={handleChange} className={`input ${errors.role ? "input-error" : "" }`}>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
            </select>
            {errors.role && <p className="form-error">{errors.role}</p>}


            <button className="btn btn-primary" type="submit">Guardar</button>
        </form>
    );
}