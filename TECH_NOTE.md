Decisión técnica: Grid vs Flex

He elegido usar CSS Grid para el layout principal de tarjetas (`marketGrid` y los contenedores de cards) y mantener `flex` para filas y alineaciones internas por las siguientes razones:

- Grid: permite definir explícitamente columnas y filas (1/2/4 columnas) y distribuir elementos en dos dimensiones fácilmente. Esto facilita cambios responsivos de columnas sin cálculos adicionales y es ideal para galerías o dashboards con tarjetas.
- Flex: es más apropiado para elementos en una sola dimensión (filas o columnas), como centrar items en un header, alinear iconos junto a texto o distribuir botones.

Resumen: Grid para la estructura principal (tarjetas), Flex para la alineación interna y componentes, combinando ambos según su fortaleza.
