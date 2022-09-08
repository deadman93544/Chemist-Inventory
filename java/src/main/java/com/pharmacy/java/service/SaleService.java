package com.pharmacy.java.service;

import com.pharmacy.java.entity.Customer;
import com.pharmacy.java.entity.DaySale;
import com.pharmacy.java.entity.Sale;
import com.pharmacy.java.enums.PaymentStatus;
import com.pharmacy.java.jpa.CustomerRepository;
import com.pharmacy.java.jpa.DaySaleRepository;
import com.pharmacy.java.jpa.SaleItemRepository;
import com.pharmacy.java.jpa.SaleRepository;
import com.pharmacy.java.view.daySale.DaySaleRequest;
import com.pharmacy.java.view.sale.SaleRequest;
import com.pharmacy.java.view.sale.SaleResponse;
import com.pharmacy.java.view.saleItem.SaleItemResponse;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SaleService {

    private static final Logger logger = LoggerFactory.getLogger(SaleService.class);

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private SaleItemService saleItemService;

    @Autowired
    private SaleItemRepository saleItemRepository;

    @Autowired
    private DaySaleRepository daySaleRepository;

    @Autowired
    private DaySaleService daySaleService;

    public SaleService() {
    }

    public void createSale(SaleRequest saleRequest){
        Customer customer = null;
        if(saleRequest.getCustomerRequest().getPhoneNum() != null){
            customer = customerService.getOrCreateCustomer(saleRequest.getCustomerRequest());
            logger.info("Customer found or created with name {}", customer.getName());
        }
        DaySale daySale = daySaleService.getTopDaySale();

        Sale sale = saleRepository.saveAndFlush(new Sale(saleRequest, customer, daySale));
        logger.info("Sale created with Id {}. Adding SaleItems", sale.getId());
        saleRequest.getSaleItemRequests().
                forEach(saleItemRequest -> saleItemService.createSaleItem(saleItemRequest, sale));
        if (customer != null && sale.getPaymentStatus() == PaymentStatus.BALANCE){
            customerService.updateCustomerBalance(customer, sale.getBalance());
            logger.info("Updating Customer {}'s balance", customer.getName());
        }
        daySaleService.updateDaySale(
                daySale.getId(),
                1,
                sale.getDiscountedPrice(),
                sale.getPaymentStatus() == PaymentStatus.BALANCE ? 1 : 0,
                sale.getPaymentStatus() == PaymentStatus.BALANCE ? sale.getBalance() : 0
        );
    }

//    public void createSale(SaleRequest saleRequest){
//        Customer customer = null;
//        if(saleRequest.getCustomerRequest().getPhoneNum() != null){
//            logger.info("Customer is found in the given SaleRequest::CustomerRequest with name: {}", saleRequest.getCustomerRequest().getName());
//            customer = customerRepository.findById(saleRequest.getCustomerRequest().getId())
//                .orElse(customerService.createCustomer(saleRequest.getCustomerRequest()));
//            logger.info("Customer Id: " + customer.getName() + customer.getId());
//        }
//
//        DaySale daySale = daySaleRepository.findTopByOrderByCreatedDateDesc();
////        logger.info("DaySale is found with Id: {}", daySale.getId());
//        if (daySale == null || daySale.getCreatedDate().before(new DateTime().withTimeAtStartOfDay().toDate())){
//            logger.info("Today's DaySale not found, creating with Date: {}", new Date().getDate());
//            DaySaleRequest daySaleRequest = new DaySaleRequest();
//            daySaleRequest.update(null, new Date(), 0, 0, 0, 0);
//            daySale = daySaleService.createDaySale(daySaleRequest);
//        }
//
//        logger.info("Creating new Sale");
//        Sale sale = saleRepository.saveAndFlush(new Sale(saleRequest, 0.0, customer, daySale));
//        logger.info("Setting sale Id {} for each saleItem", sale.getId());
//        saleRequest.getSaleItemRequests().
//                forEach(saleItemRequest -> saleItemRequest.setSaleId(sale.getId()));
//        double salePrice = saleItemService.saveAllSaleItems(saleRequest.getSaleItemRequests());
//        logger.info("Saving all the SaleItem from SaleItemService with salePrice: {}", salePrice);
//        sale.updateSalePrice(salePrice);
//        saleRepository.saveAndFlush(sale);
//
//        if (customer != null && saleRequest.getPaymentStatus() == PaymentStatus.BALANCE) {
//            logger.info("Updating Sales PaymentStatus {} in customer with Id {}", PaymentStatus.BALANCE, customer.getId());
//            customerService.updateFromSales(customer, salePrice);
//        }
//        logger.info("Updating Sale Amount in DaySale");
//        daySaleService.updateDaySaleFromSales(daySale, salePrice, saleRequest.getPaymentStatus());
//    }

    public List<SaleResponse> getAllSales(){
        logger.info("Returning a list of All Sales");
        return saleRepository.findAll()
                .stream().map(sale -> new SaleResponse(sale, saleItemRepository
                        .findAllBySaleId(sale.getId())
                        .stream().map(SaleItemResponse::new)
                        .collect(Collectors.toList()))).collect(Collectors.toList());
    }

    public SaleResponse getSaleById(Long saleId){
        logger.info("Finding a Sale with Id: {}", saleId);
        return saleRepository.findById(saleId)
                .map(sale -> new SaleResponse(sale, saleItemRepository
                        .findAllBySaleId(sale.getId())
                        .stream().map(SaleItemResponse::new)
                        .collect(Collectors.toList()))).orElseThrow(RuntimeException::new);
    }

    public void updateSale(SaleRequest saleRequest){
//        logger.info("Updating Sale with Id: {}", saleRequest.getId());
//        Customer customer = null;
//        if(saleRequest.getCustomerRequest().getPhoneNum() != null){
//            logger.info("Customer Request found in SaleRequest with name: {}", saleRequest.getCustomerRequest().getName());
//            customer = customerRepository.findById(saleRequest.getCustomerRequest().getId())
//                    .orElse(customerService.createCustomer(saleRequest.getCustomerRequest()));
//        }
//        Sale sale = saleRepository.findById(saleRequest.getId()).orElseThrow(RuntimeException::new);
//        if (sale.getPaymentStatus() == PaymentStatus.BALANCE && saleRequest.getPaymentStatus() == PaymentStatus.PAID){
//            logger.info("Updating PaymentStatus from {} to {}", PaymentStatus.BALANCE, PaymentStatus.PAID);
//            DaySale daySale = daySaleRepository.findById(sale.getDaySale().getId()).orElseThrow(RuntimeException::new);
//            daySaleService.updatePaymentStatus(daySale, sale.getSalePrice());
//        }
//        sale.update(saleRequest.getPaymentStatus(), sale.getSalePrice(), customer);
//        saleRepository.saveAndFlush(sale);
    }

    public void deleteSale(Long saleId){
//        logger.info("Deleting SaleItems of Sale with Id: {}", saleId);
//        saleItemRepository.findAllBySaleId(saleId)
//                .forEach(saleItem -> saleItemService.deleteSaleItem(saleItem.getId()));
//        Sale sale = saleRepository.findById(saleId).orElseThrow(RuntimeException::new);
//        if(sale.getPaymentStatus() == PaymentStatus.BALANCE){
//            logger.info("Sale PaymentStatus is {}", PaymentStatus.BALANCE);
//            if(sale.getCustomer() != null){
//                Customer customer = customerRepository.findById(sale.getCustomer().getId())
//                        .orElseThrow(RuntimeException::new);
//                customer.setBalance(customer.getBalance() - sale.getSalePrice());
//                logger.info("Updating Customer's Balance with Customer Id: {}", customer.getId());
//                customerRepository.saveAndFlush(customer);
//            }
//            DaySale daySale = daySaleRepository.findById(sale.getDaySale().getId())
//                    .orElseThrow(RuntimeException::new);
//            logger.info("Updating Total Sales");
//            daySaleService.updateFromDeleteSale(daySale, sale.getSalePrice(), sale.getPaymentStatus());
//        }
//        logger.info("Deleting Sale with saleId: {}", sale.getId());
//        saleRepository.delete(sale);
    }

}
