import sunyData

print("get_suny_map_data returns: ")
print(sunyData.get_suny_map_data("https://data.ny.gov/resource/a5je-8vxp.json"))
print("get_suny_plot_data returns: ")
print(sunyData.get_suny_plot_data("https://data.ny.gov/resource/dv3t-9r67.json"))
print("get_suny_chart_data returns: ")
print(sunyData.get_suny_chart_data(
    "https://data.ny.gov/resource/a5je-8vxp.json",
    "https://data.ny.gov/resource/dv3t-9r67.json"))

