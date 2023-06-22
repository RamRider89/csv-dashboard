const LOCALE_LANG = 'es-MX';

const languageDataTable = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    oPaginate: {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    oAria: {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
}


const defaultColors = {
    "blue": "#4e73df",
    "indigo": "#6610f2",
    "purple": "#6f42c1",
    "pink": "#e83e8c",
    "red": "#e74a3b",
    "orange": "#fd7e14",
    "yellow": "#f6c23e",
    "green": "#1cc88a",
    "teal": "#20c9a6",
    "cyan": "#36b9cc",
    "white": "#fff",
    "gray": "#858796",
    "gray - dark": "#5a5c69",
    "primary": "#4e73df",
    "secondary": "#858796",
    "success": "#1cc88a",
    "info": "#36b9cc",
    "warning": "#f6c23e",
    "danger": "#e74a3b",
    "light": "#f8f9fc",
    "dark": "#5a5c69"
}

const defaultBreakpoint = {
    "breakpoint - xs": "0",
    "breakpoint - sm": "576px",
    "breakpoint - md": "768px",
    "breakpoint - lg": "992px",
    "breakpoint - xl": "1200px"
}

const COLOR_CHARTS_PALETTE = [{
    name: "maroon",
    color: "#800000"
},
{
    name: "dark red",
    color: "#8B0000"
},
{
    name: "brown",
    color: "#A52A2A"
},
{
    name: "firebrick",
    color: "#B22222"
},
{
    name: "crimson",
    color: "#DC143C"
},
{
    name: "red",
    color: "#FF0000"
},
{
    name: "tomato",
    color: "#FF6347"
},
{
    name: "coral",
    color: "#FF7F50"
},
{
    name: "indian red",
    color: "#CD5C5C"
},
{
    name: "light coral",
    color: "#F08080"
},
{
    name: "dark salmon",
    color: "#E9967A"
},
{
    name: "salmon",
    color: "#FA8072"
},
{
    name: "light salmon",
    color: "#FFA07A"
},
{
    name: "orange red",
    color: "#FF4500"
},
{
    name: "dark orange",
    color: "#FF8C00"
},
{
    name: "orange",
    color: "#FFA500"
},
{
    name: "gold",
    color: "#FFD700"
},
{
    name: "dark golden rod",
    color: "#B8860B"
},
{
    name: "golden rod",
    color: "#DAA520"
},
{
    name: "pale golden rod",
    color: "#EEE8AA"
},
{
    name: "dark khaki",
    color: "#BDB76B"
},
{
    name: "khaki",
    color: "#F0E68C"
},
{
    name: "olive",
    color: "#808000"
},
{
    name: "yellow",
    color: "#FFFF00"
},
{
    name: "yellow green",
    color: "#9ACD32"
},
{
    name: "dark olive green",
    color: "#556B2F"
},
{
    name: "olive drab",
    color: "#6B8E23"
},
{
    name: "lawn green",
    color: "#7CFC00"
},
{
    name: "chart reuse",
    color: "#7FFF00"
},
{
    name: "green yellow",
    color: "#ADFF2F"
},
{
    name: "dark green",
    color: "#006400"
},
{
    name: "green",
    color: "#008000"
},
{
    name: "forest green",
    color: "#228B22"
},
{
    name: "lime",
    color: "#00FF00"
},
{
    name: "lime green",
    color: "#32CD32"
},
{
    name: "light green",
    color: "#90EE90"
},
{
    name: "pale green",
    color: "#98FB98"
},
{
    name: "dark sea green",
    color: "#8FBC8F"
},
{
    name: "medium spring green",
    color: "#00FA9A"
},
{
    name: "spring green",
    color: "#00FF7F"
},
{
    name: "sea green",
    color: "#2E8B57"
},
{
    name: "medium aqua marine",
    color: "#66CDAA"
},
{
    name: "medium sea green",
    color: "#3CB371"
},
{
    name: "light sea green",
    color: "#20B2AA"
},
{
    name: "dark slate gray",
    color: "#2F4F4F"
},
{
    name: "teal",
    color: "#008080"
},
{
    name: "dark cyan",
    color: "#008B8B"
},
{
    name: "aqua",
    color: "#00FFFF"
},
{
    name: "cyan",
    color: "#00FFFF"
},
{
    name: "light cyan",
    color: "#E0FFFF"
},
{
    name: "dark turquoise",
    color: "#00CED1"
},
{
    name: "turquoise",
    color: "#40E0D0"
},
{
    name: "medium turquoise",
    color: "#48D1CC"
},
{
    name: "pale turquoise",
    color: "#AFEEEE"
},
{
    name: "aqua marine",
    color: "#7FFFD4"
},
{
    name: "powder blue",
    color: "#B0E0E6"
},
{
    name: "cadet blue",
    color: "#5F9EA0"
},
{
    name: "steel blue",
    color: "#4682B4"
},
{
    name: "corn flower blue",
    color: "#6495ED"
},
{
    name: "deep sky blue",
    color: "#00BFFF"
},
{
    name: "dodger blue",
    color: "#1E90FF"
},
{
    name: "light blue",
    color: "#ADD8E6"
},
{
    name: "sky blue",
    color: "#87CEEB"
},
{
    name: "light sky blue",
    color: "#87CEFA"
},
{
    name: "midnight blue",
    color: "#191970"
},
{
    name: "navy",
    color: "#000080"
},
{
    name: "dark blue",
    color: "#00008B"
},
{
    name: "medium blue",
    color: "#0000CD"
},
{
    name: "blue",
    color: "#0000FF"
},
{
    name: "royal blue",
    color: "#4169E1"
},
{
    name: "blue violet",
    color: "#8A2BE2"
},
{
    name: "indigo",
    color: "#4B0082"
},
{
    name: "dark slate blue",
    color: "#483D8B"
},
{
    name: "slate blue",
    color: "#6A5ACD"
},
{
    name: "medium slate blue",
    color: "#7B68EE"
},
{
    name: "medium purple",
    color: "#9370DB"
},
{
    name: "dark magenta",
    color: "#8B008B"
},
{
    name: "dark violet",
    color: "#9400D3"
},
{
    name: "dark orchid",
    color: "#9932CC"
},
{
    name: "medium orchid",
    color: "#BA55D3"
},
{
    name: "purple",
    color: "#800080"
},
{
    name: "thistle",
    color: "#D8BFD8"
},
{
    name: "plum",
    color: "#DDA0DD"
},
{
    name: "violet",
    color: "#EE82EE"
},
{
    name: "magenta<b> / </b>fuchsia",
    color: "#FF00FF"
},
{
    name: "orchid",
    color: "#DA70D6"
},
{
    name: "medium violet red",
    color: "#C71585"
},
{
    name: "pale violet red",
    color: "#DB7093"
},
{
    name: "deep pink",
    color: "#FF1493"
},
{
    name: "hot pink",
    color: "#FF69B4"
},
{
    name: "light pink",
    color: "#FFB6C1"
},
{
    name: "pink",
    color: "#FFC0CB"
},
{
    name: "antique white",
    color: "#FAEBD7"
},
{
    name: "beige",
    color: "#F5F5DC"
},
{
    name: "bisque",
    color: "#FFE4C4"
},
{
    name: "blanched almond",
    color: "#FFEBCD"
},
{
    name: "wheat",
    color: "#F5DEB3"
},
{
    name: "corn silk",
    color: "#FFF8DC"
},
{
    name: "lemon chiffon",
    color: "#FFFACD"
},
{
    name: "light golden rod yellow",
    color: "#FAFAD2"
},
{
    name: "light yellow",
    color: "#FFFFE0"
},
{
    name: "saddle brown",
    color: "#8B4513"
},
{
    name: "sienna",
    color: "#A0522D"
},
{
    name: "chocolate",
    color: "#D2691E"
},
{
    name: "peru",
    color: "#CD853F"
},
{
    name: "sandy brown",
    color: "#F4A460"
},
{
    name: "burly wood",
    color: "#DEB887"
},
{
    name: "tan",
    color: "#D2B48C"
},
{
    name: "rosy brown",
    color: "#BC8F8F"
},
{
    name: "moccasin",
    color: "#FFE4B5"
},
{
    name: "navajo white",
    color: "#FFDEAD"
},
{
    name: "peach puff",
    color: "#FFDAB9"
},
{
    name: "misty rose",
    color: "#FFE4E1"
},
{
    name: "lavender blush",
    color: "#FFF0F5"
},
{
    name: "linen",
    color: "#FAF0E6"
},
{
    name: "old lace",
    color: "#FDF5E6"
},
{
    name: "papaya whip",
    color: "#FFEFD5"
},
{
    name: "sea shell",
    color: "#FFF5EE"
},
{
    name: "mint cream",
    color: "#F5FFFA"
},
{
    name: "slate gray",
    color: "#708090"
},
{
    name: "light slate gray",
    color: "#778899"
},
{
    name: "light steel blue",
    color: "#B0C4DE"
},
{
    name: "lavender",
    color: "#E6E6FA"
},
{
    name: "floral white",
    color: "#FFFAF0"
},
{
    name: "alice blue",
    color: "#F0F8FF"
},
{
    name: "ghost white",
    color: "#F8F8FF"
},
{
    name: "honeydew",
    color: "#F0FFF0"
},
{
    name: "ivory",
    color: "#FFFFF0"
},
{
    name: "azure",
    color: "#F0FFFF"
},
{
    name: "snow",
    color: "#FFFAFA"
},
{
    name: "black",
    color: "#000000"
},
{
    name: "dim gray / dim grey",
    color: "#696969"
},
{
    name: "gray / grey",
    color: "#808080"
},
{
    name: "dark gray / dark grey",
    color: "#A9A9A9"
},
{
    name: "silver",
    color: "#C0C0C0"
},
{
    name: "light gray / light grey",
    color: "#D3D3D3"
},
{
    name: "gainsboro",
    color: "#DCDCDC"
},
{
    name: "white smoke",
    color: "#F5F5F5"
},
{
    name: "white",
    color: "#FFFFFF"
}
];