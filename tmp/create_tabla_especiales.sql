-- ============================================================
-- TABLA: usuarios_especiales_demo02
-- Sistema de acceso especial con contraseñas individuales y
-- tiempo de vida de 72 horas.
-- ============================================================

CREATE TABLE IF NOT EXISTS usuarios_especiales_demo02 (
  id                   uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at           timestamptz DEFAULT now() NOT NULL,
  correo               text UNIQUE NOT NULL,
  nombre               text NOT NULL,
  numero_orden         integer NOT NULL,
  password_especial    text NOT NULL,
  reveal_token         text NOT NULL,
  email_enviado_at     timestamptz,
  password_visto_at    timestamptz,
  alerta_24h_enviada   boolean DEFAULT false NOT NULL,
  expiracion_enviada   boolean DEFAULT false NOT NULL,
  estado               text DEFAULT 'pendiente' NOT NULL
    CHECK (estado IN ('pendiente', 'activo', 'expirado'))
);

-- Índice para búsquedas frecuentes por correo
CREATE INDEX IF NOT EXISTS idx_usuarios_especiales_correo 
  ON usuarios_especiales_demo02(correo);

-- Índice para el cron (solo usuarios activos con timer iniciado)
CREATE INDEX IF NOT EXISTS idx_usuarios_especiales_activos 
  ON usuarios_especiales_demo02(estado, password_visto_at) 
  WHERE estado = 'activo';

-- Comentarios de columnas
COMMENT ON TABLE usuarios_especiales_demo02 IS 
  'Usuarios especiales con acceso temporal de 72h a DEMO 02. Sistema paralelo al flujo principal.';

COMMENT ON COLUMN usuarios_especiales_demo02.reveal_token IS 
  'Token único por usuario para el botón Ver Contraseña del email. Evita accesos no autorizados.';

COMMENT ON COLUMN usuarios_especiales_demo02.password_visto_at IS 
  'Timestamp de cuando el usuario hizo clic en Ver Contraseña. Es el inicio del contador de 72 horas.';

COMMENT ON COLUMN usuarios_especiales_demo02.alerta_24h_enviada IS 
  'Flag para no reenviar el correo de alerta cuando quedan 24h.';

COMMENT ON COLUMN usuarios_especiales_demo02.expiracion_enviada IS 
  'Flag para no reenviar el correo de expiración.';
