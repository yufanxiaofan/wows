# -*- coding: utf-8 -*-
"""
Created on Wed Feb 03 09:58:37 2016

@author: yyang
"""

#
# Monte Carlo valuation of European call options with Numpy
#

import math
import numpy as np
from time import time
import matplotlib.pyplot as plt

np.random.seed(20000)
t0=time()

# Parameters
S0=100.
K=105
T=1.
r=0.05
sigma=0.2
M=50
dt=T/M
I=100000

# Simulating I paths with M time steps
S=np.zeros((M+1,I))
#S[0]=S0
#for t in range(1,M+1):
#    z=np.random.standard_normal(I)
#    S[t]=S[t-1]*np.exp((r-0.5*sigma**2)*dt+sigma*math.sqrt(dt)*z)

S = S0*np.exp(np.cumsum((r-0.5*sigma**2)*dt+sigma*math.sqrt(dt)*np.random.standard_normal((M+1,I)),axis=0))
S[0]=S0
C0=math.exp(-r*T)*np.sum(np.maximum(S[-1]-K,0))/I
tnp1=time()-t0
#pdb.set_trace()
print "Euro call optio nvalue %7.3f" % C0
print "Calculation in seconds %7.3f" % tnp1

#plt.plot(S[:,:10])
#plt.grid(True)
#plt.xlabel('time step')
#plt.ylabel('index level')
plt.ion()
plt.hist(S[-1],bins=50)
plt.grid(True)
plt.xlabel('index level')
plt.ylabel('frequency')
plt.waitforbuttonpress() 