import plotly.graph_objects as go
import json

# Load the color palette data
data = {
  "colorPalette": {
    "baseColors": [
      {"name": "Background Primary", "hex": "#0A0A0F", "usage": "Main app background", "rgb": [10, 10, 15]},
      {"name": "Background Secondary", "hex": "#1e1e2f", "usage": "Gradient accent", "rgb": [30, 30, 47]}
    ],
    "neonAccents": [
      {"name": "Electric Blue", "hex": "#00D4FF", "usage": "Primary interactions", "rgb": [0, 212, 255]},
      {"name": "Purple", "hex": "#A855F7", "usage": "Secondary accent", "rgb": [168, 85, 247]},
      {"name": "Magenta", "hex": "#FF0080", "usage": "Entrepreneurship category", "rgb": [255, 0, 128]},
      {"name": "Lime Green", "hex": "#00FF85", "usage": "Education category", "rgb": [0, 255, 133]}
    ],
    "typography": [
      {"name": "Text Primary", "hex": "#f0f0f0", "usage": "Main text", "rgb": [240, 240, 240]},
      {"name": "Text Secondary", "hex": "#cccccc", "usage": "Subtitle text", "rgb": [204, 204, 204]},
      {"name": "Text Muted", "hex": "#999999", "usage": "Placeholder text", "rgb": [153, 153, 153]}
    ],
    "glassEffects": [
      {"name": "Glass Background", "hex": "rgba(255,255,255,0.05)", "usage": "Panel transparency", "opacity": 0.05},
      {"name": "Glass Border", "hex": "rgba(255,255,255,0.1)", "usage": "Panel borders", "opacity": 0.1}
    ]
  }
}

# Create figure
fig = go.Figure()

# Section positions and data
sections = [
    ("Base Colors", data["colorPalette"]["baseColors"]),
    ("Neon Accents", data["colorPalette"]["neonAccents"]),
    ("Typography", data["colorPalette"]["typography"]),
    ("Glass Effects", data["colorPalette"]["glassEffects"])
]

# Calculate grid layout
colors_per_row = 4
section_spacing = 3

# Add color swatches
current_y = 0

for section_idx, (section_name, colors) in enumerate(sections):
    # Add section header
    fig.add_trace(go.Scatter(
        x=[2],
        y=[current_y + 2],
        mode='text',
        text=section_name,
        textfont=dict(size=18, color='#00D4FF', family='Arial Black'),
        showlegend=False,
        cliponaxis=False
    ))
    
    # Add colors in this section
    for color_idx, color in enumerate(colors):
        x_pos = color_idx
        y_pos = current_y
        
        # Handle glass effects colors differently
        if "rgba" in color["hex"]:
            # Show glass effect with pattern
            marker_color = "rgba(255,255,255,0.1)"
            border_color = "rgba(255,255,255,0.3)"
        else:
            marker_color = color["hex"]
            border_color = "white"
        
        # Add color swatch
        fig.add_trace(go.Scatter(
            x=[x_pos],
            y=[y_pos],
            mode='markers',
            marker=dict(
                size=100,
                color=marker_color,
                symbol='square',
                line=dict(width=2, color=border_color)
            ),
            showlegend=False,
            cliponaxis=False
        ))
        
        # Add color name above swatch
        fig.add_trace(go.Scatter(
            x=[x_pos],
            y=[y_pos + 0.6],
            mode='text',
            text=color["name"][:15],
            textfont=dict(size=11, color='white', family='Arial'),
            showlegend=False,
            cliponaxis=False
        ))
        
        # Add hex code below swatch
        hex_display = color["hex"]
        if len(hex_display) > 15:
            hex_display = "rgba(...,0.05)" if "0.05" in hex_display else "rgba(...,0.1)"
        
        fig.add_trace(go.Scatter(
            x=[x_pos],
            y=[y_pos - 0.6],
            mode='text',
            text=hex_display,
            textfont=dict(size=10, color='#f0f0f0', family='Courier New'),
            showlegend=False,
            cliponaxis=False
        ))
        
        # Add usage description below hex
        usage_text = color["usage"][:15]
        fig.add_trace(go.Scatter(
            x=[x_pos],
            y=[y_pos - 1.0],
            mode='text',
            text=usage_text,
            textfont=dict(size=9, color='#cccccc'),
            showlegend=False,
            cliponaxis=False
        ))
    
    # Move to next section
    current_y -= section_spacing

# Update layout
fig.update_layout(
    title="Omi App Redesign Color Scheme",
    paper_bgcolor="#0A0A0F",
    plot_bgcolor="#0A0A0F",
    xaxis=dict(
        showgrid=False,
        showticklabels=False,
        zeroline=False,
        range=[-0.8, 4.2]
    ),
    yaxis=dict(
        showgrid=False,
        showticklabels=False,
        zeroline=False,
        range=[current_y - 1, 3]
    )
)

# Save the chart
fig.write_image("omi_color_palette.png")