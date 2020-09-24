import socket
import re
import common_ports as cp


def string_printer(hostip, hoststring, open_ports):
    string = f'Open ports for '
    string += f"{hoststring} ({hostip})\n" if hoststring else f"{hostip}\n"
    string += f"PORT     SERVICE\n"
    for i in open_ports:
        string += f"{str(i).ljust(9,' ')}{cp.ports_and_services[i]}"
        if i != open_ports[-1]:
            string += '\n'
    return string


def get_open_ports(target, port_range, verberose=False):
    open_ports = []
    isnum = all(i.isnumeric() for i in target.split('.'))
    try:
        hostip = socket.gethostbyname(target)
    except:
        if isnum:
            return "Error: Invalid IP address"
        else:
            return "Error: Invalid hostname"
    if not isnum:
        hoststring = target
    else:
        try:
            hoststring = socket.gethostbyaddr(target)[0]
        except:
            hoststring = False

    for port in range(port_range[0], port_range[1]+1):
        conn = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        conn.settimeout(.25)
        result = conn.connect_ex((target, port))
        if result == 0:
            open_ports.append(port)
        conn.close()
    if(verberose == True):
        return string_printer(hostip, hoststring, open_ports)
    return(open_ports)


print(get_open_ports("104.26.10.78", [20, 80], verberose=True))
