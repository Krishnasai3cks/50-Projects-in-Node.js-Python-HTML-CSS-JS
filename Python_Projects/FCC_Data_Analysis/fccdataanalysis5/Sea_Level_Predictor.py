import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress
import numpy as np


def draw_plot():
    # Read data from file
    df = pd.read_csv(r'./epa-sea-level.csv', sep=',')
    # Create scatter plot

    plt.scatter(df['Year'], df['CSIRO Adjusted Sea Level'])
    # Use matplotlib to create a scatter plot using the
    # "Year" column as the x-axis and
    # the "CSIRO Adjusted Sea Level" column as the y-axix.
    # Create first line of best fit
    lin_out = linregress(
        df['Year'], df['CSIRO Adjusted Sea Level'])
    x_fit = np.linspace(df['Year'].min(), 2051)
    y_fit = x_fit*lin_out.slope+lin_out.intercept
    plt.plot(x_fit, y_fit)
    temp_df = df.loc[df['Year'] >= 2000]

    # Create second line of best fit
    new_lin = linregress(temp_df['Year'], temp_df['CSIRO Adjusted Sea Level'])
    nx_fit = np.linspace(2000, 2051)
    ny_fit = nx_fit*new_lin.slope+new_lin.intercept
    plt.plot(nx_fit, ny_fit)

    # Add labels and title
    plt.xlabel('Year')
    plt.ylabel('Sea Level (inches)')
    plt.title('Rise in Sea Level')

    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()


draw_plot()
