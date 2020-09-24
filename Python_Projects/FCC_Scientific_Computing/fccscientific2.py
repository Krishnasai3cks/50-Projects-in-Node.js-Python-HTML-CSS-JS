def blah(str):
    arr = str.split()
    time = arr[0]
    unit = None
    if(len(arr) > 1):
        unit = arr[1]
    numarr = time.split(':')
    num1 = numarr[0]
    num2 = numarr[1]
    return [num1, num2, unit]


def addminutes(a, b):
    if(a+b > 60):
        return [(a+b)//60, (a+b) - (a+b)//60 * 60]
    else:
        return [0, a+b]


def addhours(a, b, c):
    d = a+b+c
    if(d > 24):
        d = [d//24, d - d//24 * 24]
    else:
        d = [0, d]
    if(d[1] > 12):
        return [d[0], d[1]-12, True]
    else:
        return [d[0], d[1], False]


def add_time(start, duration, day=False):
    new_time = ''
    days_list = ['Monday', 'Tuesday', 'Wednesday',
                 'Thursday', 'Friday', 'Saturday', 'Sunday']
    forstart = blah(start)
    forduration = blah(duration)
    minutes = addminutes(int(forstart[1]), int(forduration[1]))
    hours = addhours(int(forstart[0]), int(forduration[0]), int(minutes[0]))
    # hours [0]    hours [1]      hours [2]      minutes[1]    forstart[2]
    #    days         hours       true/false       minutes        AM/PM
    if(len(str(minutes[1])) == 1):
        minutes[1] = '0'+str(minutes[1])
    print(hours[0], hours[1], minutes[1], hours[2])
    givenday = day
    noofdays = hours[0]
    hour = hours[1]
    change = hours[2]
    mins = minutes[1]
    atpresent = forstart[2]
    if(change):
        if(atpresent == 'PM'):
            noofdays += 1
        changes = 'PM' if atpresent == 'AM' else 'AM'
    if int(hour) == 12:
        if(atpresent == 'PM'):
            noofdays += 1
        changes = 'PM' if atpresent == 'AM' else 'AM'

    new_time = '{}:{} {}'.format(hours[1], minutes[1], changes)

    if(day):
        new_time += ", " + days_list[days_list.index(day.title()) + noofdays]
    if(noofdays == 1):
        new_time += " (next day)"
    if(noofdays > 1):
        new_time += " ({} days later)".format(noofdays)
    return new_time


# print(add_time("3:00 PM", "3:10"))
# # Returns: 6:10 PM


# print(add_time("11:30 AM", "2:32", "Monday"))
# # Returns: 2:02 PM, Monday


# print(add_time("11:43 AM", "00:20"))
# # Returns: 12:03 PM


# print(add_time("10:10 PM", "3:30"))  # done
# # Returns: 1:40 AM (next day)


# print(add_time("11:43 PM", "24:20", "tueSday"))
# # # Returns: 12:03 AM, Thursday (2 days later)

# print(add_time("6:30 PM", "205:12"))
# # # Returns: 7:42 AM (9 days later)

# if(hours[0] == 0):
#         if(hours[2] == True):
#             new_time = '{}:{} {}'.format(
#                 hours[1], minutes[1], 'AM' if forstart[2] == 'PM' else 'PM')
#             if(day != False):
#                 new_time += ', ' + day.title()
#             else:
#                 if(forstart[2] == 'PM'):
#                     new_time += ' (next day)'

#         else:
#             if(int(hours[1]) == 12):
#                 new_time = '{}:{} {}'.format(
#                     hours[1], minutes[1], 'AM' if forstart[2] == 'PM' else 'PM')
#             else:
#                 new_time = '{}:{} {}'.format(
#                     hours[1], minutes[1], forstart[2])

#             if(day != False):
#                 new_time += ', ' + day.title()
#     else:  # hours[0] is not 0
#         if(hours[2] == True):
#             if(day != False):
#                 new_time += ', '+day.title() + \
#                     ' ({} days later)'.format(hours[0])
#             else:  # no day required to specify
#                 if(forstart[2] == 'PM'):
#                     new_time += ' ({} days later)'.format(hours[0]+1)
#                 else:
#                     new_time = '{}:{} {}'.format(
#                         hours[1], minutes[1], 'AM' if forstart[2] == 'PM' else 'AM') + ' ({} days later)'.format(hours[0])
#         else:  # dont change AM PM
#             if(int(hours[1]) == 12):
#                 new_time = '{}:{} {}'.format(
#                     hours[1], minutes[1], 'AM' if forstart[2] == 'PM' else 'AM')
#             else:
#                 new_time = '{}:{} {}'.format(
#                     hours[1], minutes[1], forstart[2])
#             if(day != False):
#                 new_time += ', ' + days_list[(days_list.index(day.title())+hours[0]+1) % 7] + \
#                     ' ({} days later)'.format(hours[0]+1)
#             else:  # no day given
#                 new_time += ' ({} days later)'.format(hours[0]+1)
