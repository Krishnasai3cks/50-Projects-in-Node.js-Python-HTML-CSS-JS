import numpy as np


def calculate(lis):
    if(len(lis) < 9):
        raise ValueError("List must contain nine numbers.")
    normal = np.array(lis)
    dim3 = normal.copy()
    dim3 = dim3.reshape(3, 3)
    # mean
    normal_mean = np.mean(normal)
    axis1_mean = np.mean(dim3, axis=0)
    axis2_mean = np.mean(dim3, axis=1)
    meanfinal = (
        [axis1_mean.tolist(), axis2_mean.tolist(), eval(str(normal_mean))])
    # mean end

    # variance start
    normal_variance = np.var(normal)
    axis1_variance = np.var(dim3, axis=0)
    axis2_variance = np.var(dim3, axis=1)
    varfinal = ([axis1_variance.tolist(), axis2_variance.tolist(),
                 eval(str(normal_variance))])
    # variance end

    # standard deviation start
    nor_stan = np.std(normal)
    a1_std = np.std(dim3, axis=0)
    a2_std = np.std(dim3, axis=1)
    stanfinal = ([a1_std.tolist(), a2_std.tolist(), eval(str(nor_stan))])
    # standard deviation end

    # max start
    maxn = np.max(normal)
    a1max = np.max(dim3, axis=0)
    a2max = np.max(dim3, axis=1)
    maxfinal = ([a1max.tolist(), a2max.tolist(), eval(str(maxn))])
    # max end

    # min start
    minn = np.min(normal)
    a1min = np.min(dim3, axis=0)
    a2min = np.min(dim3, axis=1)
    minfinal = ([a1min.tolist(), a2min.tolist(), eval(str(minn))])
    # min end

    # sum start
    sumn = np.sum(normal)
    a1sum = np.sum(dim3, axis=0)
    a2sum = np.sum(dim3, axis=1)
    sumfinal = ([a1sum.tolist(), a2sum.tolist(), eval(str(sumn))])

    # sum end
    return {'mean': meanfinal, 'variance': varfinal, 'standard deviation': stanfinal, 'max': maxfinal, 'min': minfinal, 'sum': sumfinal}


print(calculate([0, 1, 2, 3, 4, 5, 6, 7, 8]))
