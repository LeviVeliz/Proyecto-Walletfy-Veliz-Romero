import { z } from 'zod';

export const eventSchema = z.object({
  id: z.string().min(1, 'ID es requerido'),
  nombre: z.string()
    .min(1, 'Nombre es requerido')
    .max(20, 'Nombre debe tener máximo 20 caracteres'),
  descripcion: z.string()
    .max(100, 'Descripción debe tener máximo 100 caracteres'),
  cantidad: z.union([
    z.number().positive('La cantidad debe ser un número positivo'),
    z.string().min(1, 'La cantidad es requerida').transform((val) => {
      const num = parseFloat(val);
      if (isNaN(num) || num <= 0) {
        throw new Error('La cantidad debe ser un número positivo mayor a 0');
      }
      return num;
    })
  ]),
  fecha: z.string()
    .min(1, 'Fecha es requerida')
    .refine((date) => {
      return !isNaN(Date.parse(date));
    }, 'Fecha debe ser válida'),
  tipo: z.enum(['ingreso', 'egreso'], {
    required_error: 'Tipo es requerido',
    invalid_type_error: 'Tipo debe ser ingreso o egreso'
  }),
  adjunto: z.string()
});

export type EventFormData = z.infer<typeof eventSchema>;