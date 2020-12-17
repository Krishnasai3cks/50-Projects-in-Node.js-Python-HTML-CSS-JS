import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from pandas.plotting import register_matplotlib_converters
register_matplotlib_converters()

# Import data (Make sure to parse dates. Consider setting index column to 'date'.)
df = pd.read_csv(r'./fcc-forum-pageviews.csv',
                 index_col='date', parse_dates=['date'])

# Clean data
df = df[(df['value'] >= df['value'].quantile(0.025)) &
        (df['value'] <= df['value'].quantile(0.975))]


def draw_line_plot():
    # Draw line plot
    fig, ax = plt.subplots(figsize=(35, 10))
    sns.lineplot(x=df.index, y='value', data=df)
    ax.set(xlabel="Date", ylabel="Page Views",
           title="Daily freeCodeCamp Forum Page Views 5/2016-12/2019")

    # Save image and return fig (don't change this part)
    fig.savefig('line_plot.png')
    return fig


draw_line_plot()


def draw_bar_plot():
    # Copy and modify data for monthly bar plot
    df_bar = df.copy()
    df_bar['date'] = df_bar.index
    df_bar['Year'] = df_bar['date'].map(lambda x: x.strftime('%Y'))
    df_bar['Month'] = df_bar['date'].map(lambda x: x.strftime('%B'))
    df_bar = pd.DataFrame({'Average Page Views': df_bar.groupby(['Year', 'Month'])[
                          'value'].mean()}).reset_index().sort_values(['Year', 'Month'], ascending=[1, 1])
    order = ['January', 'February', 'March', 'April', 'May', 'June',
             'July', 'August', 'September', 'October', 'November', 'December']
    fig, ax = plt.subplots(figsize=(20, 15))
    sns.barplot(x='Year', y='Average Page Views',
                hue='Month', ci=0, hue_order=order, data=df_bar, errwidth=1)

    ax.set(xlabel='Years', ylabel='Average Page Views')
    ax.legend(loc=2)
    # Draw bar plot

    # Save image and return fig (don't change this part)
    fig.savefig('bar_plot.png')
    return fig


def draw_box_plot():
    # Prepare data for box plots (this part is done!)
    df_box = df.copy()
    df_box.reset_index(inplace=True)
    df_box['year'] = [d.year for d in df_box.date]
    df_box['month'] = [d.strftime('%b') for d in df_box.date]
    # Draw box plots (using Seaborn)
    fig, ax = plt.subplots(figsize=(22, 9), ncols=2)
    order = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    sns.boxplot(x=df_box['year'], y=df_box['value'], data=df_box, ax=ax[0])
    # Save image and return fig (don't change this part)
    ax[0].set(xlabel='Year', ylabel='Page Views',
              title="Year-wise Box Plot (Trend)")
    sns.boxplot(x=df_box['month'], y=df_box['value'],
                order=order, data=df_box, ax=ax[1])
    ax[1].set(ylabel='Page Views', xlabel='Month',
              title='Month-wise Box Plot (Seasonality)')
    fig.savefig('box_plot.png')
    return fig
