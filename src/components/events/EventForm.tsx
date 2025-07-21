import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { addEvent, updateEvent, saveEvents } from '../../store/slices/eventsSlice';
import { eventSchema, EventFormData } from '../../schemas/eventSchema';
import { WalletEvent, EventType } from '../../types';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Container } from '../ui/Container';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';
import { z } from 'zod';

interface EventFormProps {
  editingEvent?: WalletEvent | undefined;
  onCancel: () => void;
  events: WalletEvent[];
}

export const EventForm: React.FC<EventFormProps> = ({
  editingEvent,
  onCancel,
  events,
}) => {
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState<EventFormData>({
    id: editingEvent?.id ?? '',
    nombre: editingEvent?.nombre ?? '',
    descripcion: editingEvent?.descripcion ?? '',
    cantidad: editingEvent?.cantidad ?? 0,
    fecha: editingEvent?.fecha ?? new Date().toISOString().split('T')[0],
    tipo: editingEvent?.tipo ?? 'ingreso',
    adjunto: editingEvent?.adjunto ?? '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string>(editingEvent?.adjunto ?? '');

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        id: editingEvent.id,
        nombre: editingEvent.nombre,
        descripcion: editingEvent.descripcion ?? '',
        cantidad: editingEvent.cantidad,
        fecha: editingEvent.fecha,
        tipo: editingEvent.tipo,
        adjunto: editingEvent.adjunto ?? '',
      });
      setImagePreview(editingEvent.adjunto ?? '');
    }
  }, [editingEvent]);

  const handleInputChange = (field: keyof EventFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    let value: string | number = e.target.value;
    
    if (field === 'cantidad') {
      if (value === '') {
        value = 0;
      } else if (!isNaN(Number(value))) {
        value = Number(value);
      } else {
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, adjunto: 'La imagen debe ser menor a 5MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData(prev => ({ ...prev, adjunto: base64 }));
        setImagePreview(base64);
        if (errors.adjunto) {
          setErrors(prev => ({ ...prev, adjunto: '' }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, adjunto: '' }));
    setImagePreview('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const dataToValidate = editingEvent 
        ? formData 
        : { ...formData, id: crypto.randomUUID() };
      
      const validatedData = eventSchema.parse(dataToValidate);
      
      if (editingEvent) {
        dispatch(updateEvent(validatedData as WalletEvent));
      } else {
        const { id, ...eventData } = validatedData;
        dispatch(addEvent(eventData));
      }
      
      const updatedEvents = editingEvent
        ? events.map(event => event.id === editingEvent.id ? validatedData as WalletEvent : event)
        : [...events, validatedData as WalletEvent];
      
      dispatch(saveEvents(updatedEvents));
      onCancel();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error('Form submission error:', error);
      }
    }
  };

  const typeOptions = [
    { value: 'ingreso', label: 'Ingreso' },
    { value: 'egreso', label: 'Egreso' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button
              onClick={onCancel}
              variant="ghost"
              icon={ArrowLeft}
              className="mb-4"
            >
              Volver al Balance
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {editingEvent ? 'Editar Evento' : 'Crear Nuevo Evento'}
            </h1>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nombre"
                  value={formData.nombre}
                  onChange={handleInputChange('nombre')}
                  error={errors.nombre}
                  placeholder="Ej: Salario, Compra supermercado..."
                  required
                />

                <Select
                  label="Tipo"
                  value={formData.tipo}
                  onChange={handleInputChange('tipo')}
                  options={typeOptions}
                  error={errors.tipo}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Cantidad"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.cantidad}
                  onChange={handleInputChange('cantidad')}
                  error={errors.cantidad}
                  placeholder="Ingrese la cantidad"
                  required
                />

                <Input
                  label="Fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleInputChange('fecha')}
                  error={errors.fecha}
                  required
                />
              </div>

              <TextArea
                label="Descripción"
                value={formData.descripcion}
                onChange={handleInputChange('descripcion')}
                error={errors.descripcion}
                placeholder="Descripción opcional del evento..."
                rows={3}
              />

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Adjunto (Imagen)
                </label>
                
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                    />
                    <Button
                      type="button"
                      onClick={removeImage}
                      variant="danger"
                      size="sm"
                      icon={X}
                      className="absolute -top-2 -right-2 !p-1 rounded-full"
                    />
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                          Subir imagen
                        </span>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="sr-only"
                        />
                      </label>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF hasta 5MB
                      </p>
                    </div>
                  </div>
                )}
                
                {errors.adjunto && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.adjunto}</p>
                )}
              </div>

              <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="submit"
                  icon={Save}
                  className="flex-1"
                >
                  {editingEvent ? 'Actualizar Evento' : 'Crear Evento'}
                </Button>
                
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="secondary"
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </div>
  );
};