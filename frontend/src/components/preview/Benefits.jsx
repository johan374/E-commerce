import { Truck, Shield, Stars, HeadphonesIcon } from 'lucide-react';

function Benefits() {
    return (
        <div className="relative bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-75" />
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Why Choose us</h2>
                    <p className="mt-4 text-lg text-gray-300">Experience the best in online shopping with our premium services</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Fast Delivery Card */}
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <div className="flex items-center justify-center h-12 w-12 mx-auto bg-blue-600 rounded-md">
                            <Truck className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-white">Fast Delivery</h3>
                        <p className="mt-2 text-gray-300">Free shipping on orders above $50</p>
                    </div>

                    {/* Secure Payment Card */}
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <div className="flex items-center justify-center h-12 w-12 mx-auto bg-blue-600 rounded-md">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-white">Secure Payment</h3>
                        <p className="mt-2 text-gray-300">100% secure payment methods</p>
                    </div>

                    {/* Quality Products Card */}
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <div className="flex items-center justify-center h-12 w-12 mx-auto bg-blue-600 rounded-md">
                            <Stars className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-white">Quality Products</h3>
                        <p className="mt-2 text-gray-300">Certified quality products</p>
                    </div>

                    {/* 24/7 Support Card */}
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <div className="flex items-center justify-center h-12 w-12 mx-auto bg-blue-600 rounded-md">
                            <HeadphonesIcon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-white">24/7 Support</h3>
                        <p className="mt-2 text-gray-300">Dedicated support team</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Benefits;